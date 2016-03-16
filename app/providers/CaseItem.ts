export interface CaseItem {
    id: string,
    headline: string;
    description: string;
    createdData: string;
    viewTimes: number;
    favorites: number;
    patientInfo: string;
    modality: string;
    mainContent: string;
    tags: string[];
    bodyPart: string[];
    author: { id: string, name: string, title: string };
    images: string[];
    timestamp: { createTime: string, modifyTime: string };
    diagnosisInfo: { clinicalInfo: string, imagingInfo: string };
    
}

