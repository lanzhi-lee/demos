/**
 * @param {'test' | 'pre' | 'pro'} env 
 * @param {string} nation 具体的国家代码，找@佳佳
 * @returns {string} */
function getHostName(env, nation) {
  const hosts = {
    test: {
      id: '//event.test.mi.co.id/',
      default: '//event.test.mi.com/',
    },
    pre: {
      default: '//sg-event.pre.mi.com/',
    },
    pro: {
      id: '//event.mi.co.id/',
      ru: '//ru.event.mi.com/',
      in: '//in.event.mi.com/',
      default: '//event.mi.com/',
    },
  }

  return hosts[env][nation in hosts[env] ? nation : 'default']
}
