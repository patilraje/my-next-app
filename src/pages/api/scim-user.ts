// src/pages/api/scim-user.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const response = await axios.post(
        `${process.env.OKTA_ORG_URL}/api/v1/users`,
        {
          schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
          userName: email,
          name: {
            familyName: "Doe",
            givenName: "John"
          },
          emails: [
            {
              primary: true,
              value: email,
              type: "work"
            }
          ],
          password: password
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OKTA_SCIM_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      res.status(200).json({ message: 'User created successfully', data: response.data });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        res.status(error.response?.status || 500).json({ error: error.response?.data || error.message });
      } else {
        res.status(500).json({ error: 'An unexpected error occurred' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
