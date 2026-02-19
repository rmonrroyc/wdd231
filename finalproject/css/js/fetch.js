export async function getTemplates() {
    try {
        const response = await fetch("./data/templates.json");

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching templates:", error);
        return [];
    }
}
