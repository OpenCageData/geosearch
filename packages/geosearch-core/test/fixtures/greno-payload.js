const payload = {
  documentation: 'https://opencagedata.com/geosearch',
  licenses: [
    {
      name: 'see attribution guide',
      url: 'https://opencagedata.com/credits',
    },
  ],
  results: [
    {
      bounds: {
        northeast: {
          lat: '45.21408',
          lng: '5.75312',
        },
        southwest: {
          lat: '45.15414',
          lng: '5.67761',
        },
      },
      formatted: 'Grenoble, Is\u00e8re, France',
      geometry: {
        lat: '45.18756',
        lng: '5.73578',
      },
      name: 'Grenoble',
    },
    {
      bounds: {
        northeast: {
          lat: '47.34241',
          lng: '3.55172',
        },
        southwest: {
          lat: '47.29415',
          lng: '3.48843',
        },
      },
      formatted: 'Grenois, Ni\u00e8vre, France',
      geometry: {
        lat: '47.32067',
        lng: '3.52722',
      },
      name: 'Grenois',
    },
    {
      bounds: {
        northeast: {
          lat: '37.35749',
          lng: '-96.44433',
        },
        southwest: {
          lat: '37.33974',
          lng: '-96.45380',
        },
      },
      formatted: 'Grenola, Elk, Kansas, USA',
      geometry: {
        lat: '37.34864',
        lng: '-96.45056',
      },
      name: 'Grenola',
    },
    {
      bounds: {
        northeast: {
          lat: '45.195379',
          lng: '5.723336',
        },
        southwest: {
          lat: '45.186381',
          lng: '5.710611',
        },
      },
      formatted:
        'Grenoble Institute of Technology, Grenoble, Auvergne-Rh\u00f4ne-Alpes, France',
      geometry: {
        lat: '45.19088',
        lng: '5.71697',
      },
      name: 'Grenoble Institute of Technology',
    },
    {
      bounds: {
        northeast: {
          lat: '48.62661',
          lng: '-103.92795',
        },
        southwest: {
          lat: '48.61412',
          lng: '-103.94991',
        },
      },
      formatted: 'Grenora, Williams, North Dakota, USA',
      geometry: {
        lat: '48.61837',
        lng: '-103.93840',
      },
      name: 'Grenora',
    },
  ],
  status: {
    code: 200,
    message: 'OK',
  },
  stay_informed: {
    blog: 'https://blog.opencagedata.com',
    twitter: 'https://twitter.com/OpenCage',
  },
  thanks: 'For using an OpenCage API',
  timestamp: {
    created_http: 'Wed, 26 Jan 2022 18:28:06 GMT',
    created_unix: 1643221686,
  },
  total_results: 5,
};

module.exports = { payload };
