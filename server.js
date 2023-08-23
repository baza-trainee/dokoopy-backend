const app = require('./app');
const { PORT = 3000 } = process.env;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(
                `${new Date().toLocaleString()}: Server running. Use our API on port: ${PORT}`
            );
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

startServer();
