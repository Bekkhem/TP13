var categorized = {

    async findCategorizedItems() {
        const res = await fetch("http://localhost:3001/category/categorized-items", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
                Origin: "http://localhost:3000",
            },
        });

        const result = await res.json();
        if (!result.length) return [];

        return result;
    }
}

export default categorized