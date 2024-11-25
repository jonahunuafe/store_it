"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";

// Helper function
const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient()

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", email)]
  );

  return result.total > 0 ? result.documents[0] : null;
}

// Helper function
const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
}

// Helper function
const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId
  } catch(error) {
    handleError(error, "Failed to send email OTP")
  }
}

const createAccount = async ({ fullName, email }: {fullName: string; email: string;}) => {
  const existingUser = await getUserByEmail(email);

  const accountId = await sendEmailOTP({ email })
}