import {IUser} from "../Common/interface/IUser"
import {UserRepository} from "../../infrastructure/repository/UserRepository"

export class UserService {
    private readonly _repo: UserRepository

    constructor() {
        this._repo = new UserRepository()
    }

    public async getUsers(): Promise<IUser[]> {
        return await this._repo.getUsers()
    }

    public async getUser(id: number): Promise<IUser> {
        return await this._repo.getUser(id)
    }

    public async createUser(user: IUser): Promise<IUser> {
        return await this._repo.createUser(user)
    }


}
