import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Typography from "../../components/customs/Typography"
import { Table } from "react-daisyui"

const Profile = () => {
   const { user } = useSelector((state) => state.auth)

   return (
      <section>
         <Typography size="2xl">Your profile</Typography>
         <Table className="mb-10 w-full [&>tr>td:first-child]:text-neutral-content [&>tr>td:first-child]:first-letter:uppercase">
            <Table.Row className="border-b border-neutral-content/20">
               <Table.Cell className="capitalize">user name</Table.Cell>
               <Table.Cell>{user?.username}</Table.Cell>
            </Table.Row>
            <Table.Row className="border-b border-neutral-content/20">
               <Table.Cell className="capitalize">email</Table.Cell>
               <Table.Cell>{user?.email}</Table.Cell>
            </Table.Row>
         </Table>
         <Link className="btn" to="/account/edit-profile">
            Edit your profile
         </Link>
      </section>
   )
}

Table.Cell = ({ ...props }) => <td {...props}>{props.children}</td>

export default Profile
