import Layout from "@/components/layout"
import ProfileForm from "@/components/component/ProfilForm"
import TableComponent from "@/components/component/Table"


export default function Admin() {


    return (
        <Layout pageTitle="Admin">
            
            <h1 className="m-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Page administrateur</h1>
            <div className=" w-auto mx-10 flex justify-around">
                <ProfileForm />
                <TableComponent />
            </div>
        </Layout>
    )
}