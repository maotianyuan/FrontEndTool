// 暂无数据

export default ({ text = '', style = {}, content, ...graphic } = {}) => {
    return {
        graphic: [{
            type: 'group',
            top: 'center',
            left: 'center',
            children: [{
                type: 'image',
                style: {
                    image: require('assets/svg/nodata.svg'),
                    x: 12,
                    width: 32
                }
            }, {
                type: 'text',
                style: {
                    text,
                    y: 45,
                    font: '14px "Microsoft Yahei"',
                    fill: '#687284',
                    ...style
                },
                ...graphic
            }]
        }],
        color: ['transparent'],
        title: {
            text: text,
            textStyle: {
                fontSize: 14,
                color: '#666',
                fontWeight: 'normal'
            },
            left: '50%',
            top: '48%',
            textAlign: 'center',
            textBaseAlign: 'middle'
        },
        series: [{
            type: 'pie',
            radius: '100%',
            width: '100%',
            height: '100%',
            center: 'center',
            data: [1]
        }]
    }
}