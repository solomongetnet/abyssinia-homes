const VideoSection = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <div className="py-10 px-4 sm:px-8 w-full flex flex-col gap-8 h-fit bg-background shadow-md border rounded-xl">
      <h2 className="text-lg font-extrabold">Property Video</h2>
      <iframe
        className="w-full h-[250px] md:h-[400px]"
        src={videoUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoSection;
