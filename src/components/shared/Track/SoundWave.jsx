const SoundWave = ({ isPlaying }) => {
  return (
    <div className={`sound-wave group-hover:hidden ${!isPlaying && "hidden"}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default SoundWave;
