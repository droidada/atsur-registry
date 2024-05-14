import axios, { axiosAuth } from "@/lib/axios";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import LoadingArtpieceCard from "@/components/LoadingArtpieceCard";
import SimpleArtpieceCard from "@/components/SimpleArtpieceCard";
import { Button } from "@mui/material";

interface Props {
  artistId: string;
}

const Projects: React.FC<Props> = ({ artistId }) => {
  const [projects, setProjects] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data: res } = await axios.get(
        `/public/artist/artpiece/${artistId}?page=${currentPage}`,
      );

      console.log(res?.data);
      setProjects(res?.data.artpieces);
      setTotalPages(res?.data.totalPages);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentPage]);

  console.log(projects);

  if (loading) {
    return (
      <div className="grid grid-cols-auto-fit gap-4">
        {[...Array(6)].map((_, index) => (
          <LoadingArtpieceCard key={`loading-artpiece-card-${index}`} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-auto-fit gap-4">
        {projects?.map((project) => (
          <SimpleArtpieceCard
            isBlack
            isSmall
            containerClassName={`w-full ${
              projects.length < 2 ? "lg:max-w-[281px]" : ""
            }`}
            url={`/explore/art-piece/${project?._id}`}
            title={project?.title}
            image={project?.assets[0]?.url}
            creator={{
              name: `${project?.custodian?.profile?.firstName} ${project?.custodian?.profile?.lastName}`,
              image: project?.custodian?.profile?.avatar,
            }}
            key={project.id}
          />
        ))}
      </div>
      <div className="flex justify-center">
        {currentPage === totalPages && (
          <Button className="my-[48px] max-w-[214px] mx-auto h-[60px] bg-primary text-white text-[19px] leading-[16px]">
            Load More
          </Button>
        )}
      </div>
    </div>
  );
};

export default Projects;
