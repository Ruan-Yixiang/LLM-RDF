module.exports = {
    assetsDir: 'static',
    devServer: {
        proxy: 'http://localhost:5000'
    },

    backend_url: 'http://10.99.150.180:81',

    ip:{
        "test_instr": "192.168.3.16",
        "Unchained": "192.168.1.77",
        "Discover": "192.168.1.205",
        "Thermo": "192.168.1.102",
        "Robot1": "192.168.1.98",
        "Robot2": "192.168.3.16",
        "SepaBean": "192.168.3.16",
        "Rotavapor": "192.168.3.16",
        "ScaraT": "192.168.3.16",
        "AAA": "192.168.1.98"
    },

    loc:{
        "Unchained": -17920,
        "Discover": -14420,
        "PT": -11220,
        "EC": -7920,
        "Purifier": -4220,

        "GC": -13250,
        "Cytation1": -3420,
        "Thermo": -800,

    }
};
