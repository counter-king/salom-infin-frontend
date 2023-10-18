export const getStorageItem = (item) => {
	return window.localStorage.getItem(item);
};

export const saveStorageItem = (key, value) => {
	window.localStorage.setItem(key, value);
};

export const removeStorageItem = (key) => {
	window.localStorage.removeItem(key);
};
