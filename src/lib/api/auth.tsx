import { PostgrestError, Session, User } from '@supabase/supabase-js'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import { UnauthenticatedError } from './utils'


/* Current Session */
export async function getSession( signal?: AbortSignal ): Promise<{ session: { id: string; user: User } | null }> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SUPABASE_URL}/edge/v1/session`,
		{ signal }
	)
	if (response.status === 401) {
		throw new UnauthenticatedError()
	}
	if (response.status !== 200) {
		return { session: null }
	}

	const session = await response.json()
	return { session: { id: session.id, user: session.user as User } }
}

type SessionData = { session: { id: string; user: User } | null }
type SessionError = PostgrestError

export const useSessionQuery = ( options?: UseQueryOptions<SessionData, SessionError> ) =>
useQuery<SessionData, SessionError>(
	['session'],
	({ signal }) => getSession(signal),
	options
)



/* Sign In */
type SignInData = { session: Session | null; user: User | null }
type SignInVariables = { email: string; password: string; supabaseClient }

export async function signIn({ email, password, supabaseClient }: SignInVariables) {
	const { error, data: { session, user } } = await supabaseClient.auth.signInWithPassword({
		email,
		password,
	})
	if (error) {
		throw error
	}
	return { session, user }
}


export const useSignInMutation = () => {
	const queryClient = useQueryClient()
	return useMutation<SignInData, PostgrestError, SignInVariables>(
		({ email, password, supabaseClient }) => signIn({ email, password, supabaseClient }),
		{
			onError: async (error) => {
				return error
			},
			onSuccess: async () => {
				await queryClient.resetQueries()
			},
		}
	)
}



/* Sign Up */
type SignUpData = { session: Session | null; user: User | null }
type SignUpVariables = { username: string; name: string; avatar_url: string; email: string; password: string; supabaseClient }

export async function signUp({ username, name, avatar_url, email, password, supabaseClient }: SignUpVariables) {
	const { error, data: { session, user } } = await supabaseClient.auth.signUp({
		email,
		password,
		options: {
			data: {
				username: username,
				fullname: name,
				avatar_url
			}
		}
	})
	if (error) {
		throw error
	}
	return { session, user }
}

export const useSignUpMutation = () => {
	const queryClient = useQueryClient()
	return useMutation<SignUpData, PostgrestError, SignUpVariables>(
		({ username, name, avatar_url, email, password, supabaseClient }) => signUp({ username, name, avatar_url, email, password, supabaseClient }),
		{
			onSuccess: async () => {
				await queryClient.resetQueries()
			},
		}
	)
}



/* Forgot Password */
type ForgotPasswordData = { success: boolean }
type ForgotPasswordVariables = { email: string }

export async function forgotPassword({ email }: ForgotPasswordVariables) {
	const { success } = await fetch(`/api/auth/forgot-password`, {
		method: 'POST',
		body: JSON.stringify({ email }),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((res) => res.json())
	return { success }
}

export const useForgotPasswordMutation = () => {
	return useMutation<ForgotPasswordData, unknown, ForgotPasswordVariables>(
		({ email }) => forgotPassword({ email })
	)
}



/* Sign Out */
type SignOutData = void
type SignOutVariables = { supabaseClient }

export async function signOut({ supabaseClient }) {
	const { error } = await supabaseClient.auth.signOut()
	if (error) {
		throw error
	}
}

export const useSignOutMutation = () => {
	const queryClient = useQueryClient()
	return useMutation<SignOutData, PostgrestError, SignOutVariables>(
		(supabaseClient) => signOut(supabaseClient),
		{
			async onSuccess() {
				await queryClient.resetQueries()
				window.location.href = '/access?op=signin'
			},
		}
	)
}

