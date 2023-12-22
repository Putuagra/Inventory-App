import { getAll } from "../apis/AccountApi"


export default function AccountRepository() {
    const [account, setAccount] = useState([])
    const [editingAccount, setEditingAccount] = useState(null)
    const navigateAuthenticated = useNavigate()
    const navigateLogin = useNavigate()

    useEffect(() => {
        const storedToken = GetAuth()
        const isAuthenticated = storedToken !== null
        if (isAuthenticated) {
            const decode = jwtDecode(storedToken)
            fetchData()
            const expirationTime = decode.exp * 1000
            const currentTime = Date.now()
            if (currentTime > expirationTime) {
                RemoveAuth()
                navigateLogin('/login')
            }
        } else if (!isAuthenticated) {
            navigateAuthenticated('/error401')
        }
    }, [])

    const fetchData = async () => {
        try {
            const data = await getAll()
            setAccount(data)
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    const handleCreate = async (newAccount) => {
        try {
            await create(newAccount)
            fetchData()
        } catch (error) {
            console.error("Error create account", error)
        }
    }

    const handleUpdate = async (updatedAccount) => {
        try {
            await update(updatedAccount)
            setEditingAccount(null)
            fetchData()
        } catch (error) {
            console.error('Error editing user:', error)
        }
    }

    const handleDelete = async (accountGuid) => {
        try {
            const response = await remove(accountGuid)
            if (account.length === 1) {
                setAccount([])
            }
            fetchData()
            return response
        } catch (error) {
            console.error('Error deleting account:', error)
        }
    }

    return { account, editingAccount, handleCreate, handleUpdate, handleDelete }
}