import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Typography from "../customs/atoms/Typography"

const Profile = () => {
    const { user } = useSelector((state) => state.auth)

    return (
        <section>
            <Typography size="2xl">Your profile</Typography>
            <table className="mb-10 table w-full [&>tr>td:first-child]:text-neutral-content [&>tr>td:first-child]:first-letter:uppercase">
                <tr className="hover border-b border-neutral-content/20">
                    <td>user name</td>
                    <td>{user?.username}</td>
                </tr>
                <tr className="hover border-b border-neutral-content/20">
                    <td>email</td>
                    <td>{user?.email}</td>
                </tr>
            </table>
            <Link className="btn" to="/account/edit-profile">
                Edit your profile
            </Link>
        </section>
    )
}

export default Profile
