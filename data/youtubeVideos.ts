type VideoItem = {
  title: string;
  description?: string;
  youtubeId?: string; // for single video embeds
  playlistId?: string; // for playlist embeds
  href?: string; // link to YouTube page
  duration?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
};

export const videos: VideoItem[] = [
  {
    title: "Introduction to the Federated Learning Module",
    description: "Install MEDfl, configure your environment, and run your first experiment.",
    youtubeId: "7vQFheeRvp4",
    href: "https://youtu.be/7vQFheeRvp4?si=09qGzoA2HI6xeZlV",
    duration: "8:12",
    level: "Beginner",
  },
  {
    title: "Create and run federated learning pipelines",
    description: "By the end of this video, you’ll manage and run your own federated learning experiments within MEDfl.",
    youtubeId: "WR5IC0aVMZ8",
    href: "https://youtu.be/WR5IC0aVMZ8?si=slDuxeCLihsBEj4h",
    duration: "05:37",
    level: "Intermediate",
  },
  {
    title: "MEDfl | Crash tutorial",
    description: "Drag-and-drop pipelines and launch federated training end-to-end.",
    youtubeId: "pFXtTte8BjY",
    href: "https://youtu.be/pFXtTte8BjY?si=wggls9fqwhKwcblW",
    duration: "15:05",
    level: "Intermediate",
  },
  // Example playlist card (optional)
  // {
  //   title: "Full Playlist: MEDfl Tutorials",
  //   description: "All tutorials in one place.",
  //   playlistId: "PLxxxxxx",
  //   href: "https://www.youtube.com/playlist?list=PLxxxxxx",
  //   level: "Beginner",
  // },
];