export const setItem = (key: string, data: string) => {
	try {
		localStorage.setItem(key, data)
	} catch (error) {
		console.log('Error saving data')
	}
}

export const checkSign = (key: string) => {
	try {

		if(localStorage.getItem(key)){
			return true
		}else{return false}
	} catch (error) {
		console.log('Error getting data')
	}
}

export const getItem = (key: string) => {
	try {
		return localStorage.getItem(key)
	} catch (error) {
		console.log('Error getting data')
	}
}

export const removeItem = (key: string) => {
	try {
		localStorage.removeItem(key)
	} catch (error) {
		console.log('Error removing data')
	}
}
