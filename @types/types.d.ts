type SourceType = ' text' | 'upload' | 'website' | 'docs';
type SourceStatus = 'active' | 'error' | 'training' | 'excluded';

interface PromptSource {
    id: string;
    user_email: string;
    type: string;
    name: string;
    status: string;
    source_url?: string | null;
    content: string | null;
    startup_data : string | null;
    created_at: string;
    updated_at: string;
}