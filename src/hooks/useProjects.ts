
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProjectCardProps } from "@/components/ProjectCard";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          project_contacts(*),
          project_milestones(*),
          project_documents(*)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform data to match ProjectCardProps
      const transformedData: ProjectCardProps[] = data.map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        location: project.location,
        budget: project.budget,
        progress: project.progress,
        startDate: project.start_date,
        endDate: project.end_date,
        status: project.status as "ongoing" | "completed" | "planned",
        imageUrl: project.image_url || "/placeholder.svg",
      }));

      return transformedData;
    },
  });
};
