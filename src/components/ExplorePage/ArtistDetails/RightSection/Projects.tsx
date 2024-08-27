import axios, { axiosAuth } from "@/lib/axios";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import LoadingArtpieceCard from "@/components/LoadingArtpieceCard";
import SimpleArtpieceCard from "@/components/SimpleArtpieceCard";
import { Button, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface Props {
  artistId: string;
}

const Projects: React.FC<Props> = ({ artistId }) => {
  const [projects, setProjects] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { status, data: session } = useSession();
  const axiosAuth = useAxiosAuth();

  const {
    data: projectsData,
    isLoading: projectsLoading,
    error: projectsError,
  } = useQuery({
    queryKey: ["projects", artistId, currentPage],
    queryFn: () =>
      session?.user?._id == artistId
        ? axiosAuth.get(`/art-piece/creator?page=${currentPage}`)
        : axios.get(`/public/artist/artpiece/${artistId}?page=${currentPage}`),
    refetchOnWindowFocus: false,
  });

  console.log(projectsData?.data);

  if (projectsLoading) {
    return (
      <div className="grid grid-cols-auto-fit gap-4">
        {[...Array(6)].map((_, index) => (
          <LoadingArtpieceCard key={`loading-artpiece-card-${index}`} />
        ))}
      </div>
    );
  }

  if (projectsData?.data?.artPieces?.length == 0) {
    return (
      <div className="flex flex-col items-center justify-center py-5">
        <Image
          src={"/images/empty-wallet.svg"}
          width={150}
          height={150}
          alt="empty"
        />
        <p className="italic font-[300] text-center">No projects found</p>
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-auto-fit gap-4 ">
        {projectsData?.data?.artPieces?.map((project) => (
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
        <div className="flex justify-center mt-6">
          <Pagination
            count={projectsData?.data?.meta?.totalPages}
            page={currentPage}
            onChange={(e, value) => {
              setCurrentPage(value);
              // refetch();
              window.scrollTo(0, 0);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
