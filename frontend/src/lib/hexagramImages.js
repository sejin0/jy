const TRIGRAM_IMAGES = {
  "111": {
    url: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1200&q=80",
    desc: "광활한 하늘",
  },
  "110": {
    url: "https://images.unsplash.com/photo-1506501139174-099022df5260?auto=format&fit=crop&w=1200&q=80",
    desc: "고요한 호수",
  },
  "101": {
    url: "https://images.unsplash.com/photo-1495571242337-0248550dd535?auto=format&fit=crop&w=1200&q=80",
    desc: "타오르는 태양과 노을",
  },
  "100": {
    url: "https://images.unsplash.com/photo-1532433509204-adb889625686?auto=format&fit=crop&w=1200&q=80",
    desc: "먹구름과 뇌우",
  },
  "011": {
    url: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80",
    desc: "안개 낀 숲과 바람",
  },
  "010": {
    url: "https://images.unsplash.com/photo-1558293774-a5e1e07353f0?auto=format&fit=crop&w=1200&q=80",
    desc: "깊은 물과 파도",
  },
  "001": {
    url: "https://images.unsplash.com/photo-1519681393798-38e43269d877?auto=format&fit=crop&w=1200&q=80",
    desc: "굳건한 산",
  },
  "000": {
    url: "https://images.unsplash.com/photo-1440615496174-ee7ec28f0daa?auto=format&fit=crop&w=1200&q=80",
    desc: "넓은 대지",
  },
};

export function getResultImage(hexagramKey) {
  if (typeof hexagramKey !== "string" || hexagramKey.length !== 6) {
    return null;
  }

  const trigramKey = hexagramKey.slice(3, 6);
  return TRIGRAM_IMAGES[trigramKey] || null;
}
