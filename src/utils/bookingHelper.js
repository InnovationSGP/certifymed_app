export function checkFormData(initialFormState, providedData) {
    const excludeFields = [
        '_id',
        '__v',
        'isLoggedIn',
        'createdAt',
        'updatedAt'
    ];
    const errors = [];

    for (const key in initialFormState) {
        if (excludeFields.includes(key)) continue; // Skip non-mandatory fields

        if (!(key in providedData)) {
            errors.push(`Missing field: ${key}`);
        } else if (
            providedData[key] === '' ||
            providedData[key] === null ||
            providedData[key] === undefined
        ) {
            errors.push(`Empty or invalid value for field: ${key}`);
        }
    }

    return errors.length === 0 ? true : errors;
}
