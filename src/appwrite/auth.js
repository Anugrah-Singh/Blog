/* eslint-disable no-useless-catch */
import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        if (!conf.appwriteUrl || !conf.appwriteProjectId) {
            console.error("Appwrite configuration is invalid. Please check appwriteUrl and appwriteProjectId.");
            return;
        }

        try {
            this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
            this.account = new Account(this.client);
        } catch (error) {
            console.error("Failed to initialize Appwrite client:", error);
        }
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;

