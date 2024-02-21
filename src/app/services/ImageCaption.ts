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
        return "ya29.a0AfB_byCrDI-kRbUHgA1syOe1XImuLHMqNxGKz4fCZ3RHLGgekjd_vsKo5YOyLz0B34rkg3ZYWjY3E-t_Pas0L2oo9hx4x2fsmUZEmqPJvs2WASZw1tj8GI7h2RuaJ_GQ5eH8NQ5t3kDmtIvH05kkvxlpbPOxPLAb3QaCgYKAUcSARISFQHGX2MiG9tMh-SeArbJhSyJ8Iw7KA0169"
    }
}
