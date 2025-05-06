
export const getAuthHeaders = (token: string) => ({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    });
    