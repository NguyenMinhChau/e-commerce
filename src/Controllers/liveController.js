const Live = require('../Models/Live');

const LiveController = {
    // [POST] /api/v1/live/add
    addLive: async (req, res) => {
        try {
            const { iframeURL, descVideo } = req.body;
            if (!iframeURL) {
                return res.status(400).json({
                    success: false,
                    message: 'iframeURL is required',
                });
            }
            if (!descVideo) {
                return res.status(400).json({
                    success: false,
                    message: 'descVideo is required',
                });
            }
            const newLive = await Live.create({
                iframeURL,
                descVideo,
            });
            return res.status(200).json({
                success: true,
                message: 'Add new live successfully',
                data: newLive,
            });
        } catch (err) {
            return res.status(500).json({ meaasge: err.message });
        }
    },
    // [GET] /api/v1/live/getall
    getAllLive: async (req, res) => {
        try {
            const allLive = await Live.find();
            return res.status(200).json({
                success: true,
                message: 'Get all live successfully',
                data: allLive,
            });
        } catch (err) {
            return res.status(500).json({ meaasge: err.message });
        }
    },
    // [DELETE] /api/v1/live/delete/:id
    deleteLive: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedLive = await Live.findByIdAndDelete(id);
            return res.status(200).json({
                success: true,
                message: 'Delete live successfully',
                data: deletedLive,
            });
        } catch (err) {
            return res.status(500).json({ meaasge: err.message });
        }
    },
};

module.exports = LiveController;
