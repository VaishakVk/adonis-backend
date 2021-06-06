import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { AuthenticationException } from "@adonisjs/auth/build/standalone";
import { userTypes } from "App/enum/enum";

/**
 * Silent auth middleware can be used as a global middleware to silent check
 * if the user is logged-in or not.
 *
 * The request continues as usual, even when the user is not logged-in.
 */
export default class AdminMiddleware {
  /**
   * Handle request
   */
  public async handle(
    { auth }: HttpContextContract,
    next: () => Promise<void>
  ) {
    /**
     * Check if user is admin or not
     * set to the instance of the currently logged in user.
     */
    const userData = await auth.user;
    if (userData?.type == userTypes.admin) await next();
    else
      throw new AuthenticationException(
        "Unauthorized access",
        "E_UNAUTHORIZED_ACCESS"
      );
  }
}
