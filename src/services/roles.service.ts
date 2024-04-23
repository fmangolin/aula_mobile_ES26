import { authRepository } from "./auth.repository"

class RolesService {
    private readonly baseUrl = 'http://192.168.68.102:3030/roles'

    private async getHeaders() {
        const logged = await authRepository.getLoggedUser()
        if (!logged) return null

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${logged.token}`
        }
    }

    public async get() {
        const headers = await this.getHeaders()
        if (headers) {
            const response = await fetch(this.baseUrl, {
                method: 'GET',
                headers,
            })

            if (response.status === 401) return null
            if (response.ok) {
                return (await response.json()) 
            }
        }
        return null
    }

    public async create(name: string, descricao: string) {
        const headers = await this.getHeaders()
        if (headers) {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({ name, descricao })
            })

            if (response.status === 400) return 'Role ja existe'
            if (response.status === 401) return null
            return response.ok
        }
        return null
    }

}
export const rolesService = new RolesService()