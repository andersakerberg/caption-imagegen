interface ServiceAccount {
    client_email: string;
    private_key: string;
}

interface Image {
    content: string; // Base64 encoded image
}

interface PredictRequest {
    instances: {
        image: Image;
    }[];
}

interface PredictResponse {
    predictions: {
        text: string;
    }[];
}

export class CaptionGenerator {
    constructor() {

    }

    async generateCaptions(base64Image: string): Promise<string[]> {
        try {
            const accessToken = this.getAccessToken();
            const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/rtw-armory/locations/us-central1/publishers/google/models/imagetext:predict`;


            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    instances: [{
                        image: {
                            bytesBase64Encoded: base64Image,
                        },
                    }],
                    parameters: {
                        sampleCount: 3,
                        language: "en"
                    }
                }),
            });

            const data = await response.json();
            return data.predictions;
        } catch (error) {
            console.error('Error generating captions:', error);
            throw error; // Re-throw for external handling
        }
    }

    private getAccessToken(): string {
        return "ya29.a0AfB_byA8-pp0B6U0wduSJjDpIcjIH7V3aWYA8Vq9cCEWZNzxoeEiVkQmpMuh4WDNkpK4X9HxgLFgKGrW-RmnYooSyYhj0LS5raOre82Q8FUwCUWHNQB2rTJ3L_Pu2zL1lLGL5_xffwSwrPnmuw6Ee5YXN_c8A5oVTQaCgYKAdcSARISFQHGX2MifOe0Im2mqOWTjUT742TKVw0169"
    }
}
