export interface ProjectMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Member' | 'Viewer';
}

export interface ProjectMemberResponse {
  id: string;
  user_id: string;
  role: string;
  metadata: {
    name: string;
    email: string;
  };
}