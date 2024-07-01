const DateDetails = require('../models/dateDetails-Model');

// Get all date details
exports.getAllDateDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const dateDetails = await DateDetails.getAllDateDetails(userId);
        res.status(200).json(dateDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get date details by ID
exports.getDateDetailsById = async (req, res) => {
    try {
        const userId = req.user.id;
        const dateDetail = await DateDetails.getDateDetailsById(userId);
        if (dateDetail) {
            res.status(200).json(dateDetail);
        } else {
            res.status(404).json({ message: 'Date detail not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get date details by specific date
exports.getDateDetailsByDate = async (req, res) => {
    try {
        const date = req.params.date;
        const userId = req.user.id
         // assuming date is passed as a URL parameter
        const dateDetails = await DateDetails.getDateDetailsByDate(date,userId);
        if (dateDetails.length > 0) {
            res.status(200).json(dateDetails);
        } else {
            res.status(404).json({ message: 'No details found for the specified date' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get date details by specific month and year
exports.getDateDetailsByMonthYear = async (req, res) => {
    try {
        const userId = req.user.id
        const month = req.params.month; // assuming month is passed as a URL parameter
        const year = req.params.year; // assuming year is passed as a URL parameter
        const dateDetails = await DateDetails.getDateDetailsByMonthYear(month, year, userId);
        if (dateDetails.length > 0) {
            res.status(200).json(dateDetails);
        } else {
            res.status(404).json({ message: 'No details found for the specified month and year' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new date details
exports.createDateDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const newDateDetails = await DateDetails.createDateDetails(userId,req.body);
        res.status(201).json(newDateDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update date details
exports.updateDateDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const updatedDateDetails = await DateDetails.updateDateDetails(userId, req.params.id, req.body);
        if (updatedDateDetails !== null) {
            res.status(200).json(updatedDateDetails);
        } else {
            res.status(404).json({ message: 'Date detail not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete date details
exports.deleteDateDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const deleted = await DateDetails.deleteDateDetails(userId, req.params.id);
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Date detail not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

