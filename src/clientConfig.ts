export interface ClientConfig {
  name: string;
  videoUrl: string;
}

export const clientConfigs: Record<string, ClientConfig> = {
  luisa: {
    name: 'LUISA',
    videoUrl: '/videoprueba1.mp4'
  },
  didier: {
    name: 'Didier',
    videoUrl: '/didier.mp4'
  }
};

export const getClientConfig = (clientName?: string): ClientConfig => {
  if (!clientName) {
    return clientConfigs.luisa; // Default fallback
  }
  
  const config = clientConfigs[clientName.toLowerCase()];
  if (!config) {
    console.warn(`No se encontró configuración para el cliente: ${clientName}`);
    return clientConfigs.luisa; // Fallback to default
  }
  
  console.log('getClientConfig-------:', { clientName, videoUrl: config.videoUrl });
  return config;
};

//  Cómo usar:


//- https://tudominio.com/?cliente=luisa → Muestra "LUISA" + /videoprueba.mp4
 // - https://tudominio.com/?cliente=maria → Muestra "MARÍA" + /video-maria.mp4
  //- https://tudominio.com/?cliente=carmen → Muestra "CARMEN" + /video-carmen.mp4