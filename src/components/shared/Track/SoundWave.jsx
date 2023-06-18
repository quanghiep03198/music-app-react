import classNames from "classnames"

const SoundWave = ({ isPlaying }) => (
   <div className={classNames("sound-wave group-hover:hidden", { hidden: !isPlaying })}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
   </div>
)

export default SoundWave
