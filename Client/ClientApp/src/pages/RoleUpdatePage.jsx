import { useLocation } from 'react-router-dom'
import Navigate from '../components/Navigate'
import RoleUpdate from '../components/roles/RoleUpdate'
import RoleRepository from '../repositories/RoleRepository'

const RoleUpdatePage = () => {

    const location = useLocation()
    const guid = location.state?.guid
    const prevRoleName = location.state?.prevRoleName

    const { handleUpdate, handleGetRoleById } = RoleRepository()

    return (
        <div className="container">
            <Navigate />
            <br></br>
            <RoleUpdate
                guid={guid}
                prevRoleName={prevRoleName}
                handleUpdate={handleUpdate}
                handleGetRoleById={handleGetRoleById}
            />
        </div>
    )
}

export default RoleUpdatePage