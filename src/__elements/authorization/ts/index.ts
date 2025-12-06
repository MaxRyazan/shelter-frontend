import {postApiAuthLogin} from "@/_openapi/api/auth/auth";
import {user} from "@/__stores/usser-store";
import {useCookies} from "@vueuse/integrations/useCookies";

export async function authentication(args: { email: string, password: string, saveMe?: boolean }) {
    if (args.email && args.password) {
        try {
            const cookies = useCookies()
            const response = await postApiAuthLogin({
                email: args.email,
                password: args.password
            })
            if (args.saveMe) {
                cookies.set("shelter-email", args.email)
            }
            user.value = response.user
        } catch (e) {
        } finally {
        }
    }
}