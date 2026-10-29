import { Client } from "@notionhq/client";
import { portfolioData } from "../data/portfolio";

// Initialize Notion Client conditionally
const notion = process.env.NOTION_API_KEY
  ? new Client({ auth: process.env.NOTION_API_KEY })
  : null;

export async function getProjects() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  // If no Notion credentials supplied yet, gracefully return the default projects
  if (!notion || !databaseId) {
    return {
      projects: portfolioData.projects,
      source: "local",
    };
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
    });

    if (!response.results || response.results.length === 0) {
      return {
        projects: portfolioData.projects,
        source: "local",
      };
    }

    const projects = response.results.map((page) => {
      const props = page.properties;

      // Extract Cover / Image URL
      let imageUrl = "/images/project-bakery.png";
      if (props.CoverImage?.files && props.CoverImage.files.length > 0) {
        const fileObj = props.CoverImage.files[0];
        imageUrl = fileObj.file ? fileObj.file.url : fileObj.external?.url;
      } else if (props.CoverImage?.url) {
        imageUrl = props.CoverImage.url;
      } else if (page.cover) {
        imageUrl = page.cover.file ? page.cover.file.url : page.cover.external?.url;
      }

      // Title
      const title =
        props.Title?.title?.[0]?.plain_text ||
        props.Name?.title?.[0]?.plain_text ||
        "Untitled Project";

      // Description
      const description =
        props.Description?.rich_text?.[0]?.plain_text ||
        "No description provided.";

      // Category
      const category = props.Category?.select?.name || "Project";

      // Tech Stack
      const techStack =
        props.TechStack?.multi_select?.map((t) => t.name) || [];

      // Links & Status
      const liveUrl = props.LiveURL?.url || null;
      const githubUrl = props.GithubURL?.url || null;
      const status = props.Status?.select?.name || (liveUrl ? "Live Demo" : "View Project");

      return {
        id: page.id,
        title,
        category,
        description,
        techStack,
        image: imageUrl,
        liveUrl,
        githubUrl,
        status,
        featured: true,
      };
    });

    return {
      projects,
      source: "notion",
    };
  } catch (error) {
    console.warn("Could not fetch from Notion (falling back to local projects):", error.message);
    return {
      projects: portfolioData.projects,
      source: "local",
    };
  }
}
