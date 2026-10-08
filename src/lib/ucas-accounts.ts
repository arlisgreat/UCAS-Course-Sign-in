const ALLOWED_ACCOUNT_IDS = new Set(["202618015059012", "202628013229057"]);

type CredentialResolution =
	| { ok: true; username: string; password: string }
	| { ok: false; reason: "invalid_account" | "missing_secret" };

export function resolveUcasCredentials(rawUsername: unknown): CredentialResolution {
	const username = String(rawUsername ?? "").trim();
	if (!ALLOWED_ACCOUNT_IDS.has(username)) {
		return { ok: false, reason: "invalid_account" };
	}

	const password = process.env.UCAS_SHARED_PASSWORD?.trim();
	if (!password) {
		return { ok: false, reason: "missing_secret" };
	}

	return { ok: true, username, password };
}
