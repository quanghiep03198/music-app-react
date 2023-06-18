/**
 * @enum
 */
export const Paths = {
   SEARCH: "/search",
   LIBRARY: "/library",
   ARTIST: "/artists/:id",
   PLAYLIST: "/playlists/:id",
   ALBUM: "/albums/:id",
   LIKED_TRACKS: "/liked-tracks",
   QUEUE: "/queue",
   LOGIN: "/login",
   REGISTER: "/register",
   FORGOT_PASSWORD: "/forgot-password",
   ACCOUNT: "/account",
   RESET_PASSWORD: "/account/reset-password"
}

/**
 * @enum
 */
export const AdminPaths = {
   DEFAULT: "/admin",
   ARTISTS: "/admin/artists",
   TRACKS: "/admin/tracks",
   GENRES: "/admin/genres"
}
