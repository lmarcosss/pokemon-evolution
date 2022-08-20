export function useLocalStorage() {
    function getItem(key: string) {
        const value = localStorage.getItem(key)

        if (!value) return null

        return JSON.parse(value)
    }

    function setItem(key: string, value: any) {
        const parsedValue = JSON.stringify(value)

        localStorage.setItem(key, parsedValue)
    }

    function deleteItem(key: string) {
        localStorage.removeItem(key)
    }

    return {
        getItem,
        setItem,
        deleteItem,
    }
}
