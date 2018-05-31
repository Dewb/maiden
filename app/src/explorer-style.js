export default {
  tree: {
    base: {
      listStyle: 'none',
      backgroundColor: '#000000',
      margin: 0,
      padding: 0,
      color: '#90',
      // overflow: 'scroll',
      // height: '100%',
    },
    node: {
      base: {
        position: 'relative',
      },
      // link: {
      //     cursor: 'pointer',
      //     position: 'relative',
      //     padding: '0px 5px',
      //     display: 'block'
      // },
      // activeLink: {
      //     background: '#E0E7F1'
      // },
      container: {
        marginLeft: '13px',
      },
      toggle: {
        base: {
          position: 'relative',
          // display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-8px',
        },
        height: 8,
        width: 8,
        arrow: {
          fill: '#aaaaaa',
          strokeWidth: 0,
        },
      },
      header: {
        base: {
          color: '#eeeeee',

        },
        connector: {
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle',
        },
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '14px',
      },
      loading: {
        color: '#E2C089',
      },
    },
  },
};
