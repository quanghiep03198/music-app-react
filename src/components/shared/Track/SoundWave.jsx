import styles from "./TrackCard.module.css"

const SoundWave = ({ isPlaying }) => {
    return (
        <div className={`${styles["sound-wave"]} group-hover:hidden ${!isPlaying && "hidden"}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default SoundWave
