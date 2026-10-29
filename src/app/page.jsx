import { getProjects } from "../lib/notion";
import PortfolioClient from "../components/PortfolioClient";

// Incremental Static Regeneration (ISR): Check Notion for updates every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  const { projects, source } = await getProjects();

  return <PortfolioClient initialProjects={projects} cmsSource={source} />;
}
