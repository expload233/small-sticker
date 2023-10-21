import { Alert, QRCode, Segmented, message, Button, Empty } from "antd";
import { useCallback, useRef, useState } from "react";
import HighText from "../components/HighText";
import showImage from "../utils/downloadHtmlAsImage/showImage";

export default function Maoyan() {
  const ref = useRef<HTMLDivElement>(null)
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const [imageSrc, setImageSrc] = useState<{time: string, data: string}[]>([]);
  const [highLight , setHighLight] = useState<boolean>(true)
  const [status , setStatus] = useState<number>(0)
  
  const out = useCallback(() => {
    if (ref.current === null) {
      return
    }

    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });

    try {
      showImage(ref.current,"PNG", true).then((imageData)=>{
        if(imageData === 'data:image/png;') {
          messageApi.open({
            key,
            type: 'error',
            content: '生成失败，请将控制台截图反馈给开发者',
          });
        }
        setImageSrc((v)=>[{time: new Date().toLocaleString(), data: imageData}, ...v])
      })

      messageApi.open({
        key,
        type: 'success',
        content: '生成成功！',
      });

      // showModal()
    } catch (error) {
        console.log(error)
        messageApi.open({
          key,
          type: 'error',
          content: '生成失败，请将控制台截图反馈给开发者',
        });
    }
  }, [ref, messageApi])

  
  return (
    <div mt-4>
      {contextHolder}
      <Alert message="【新设计模式】直接点击文字即可编辑！" type="info" showIcon />
      <div mt-4>
        {/* <Switch checked={highLight} onChange={(checked)=>{setHighLight(checked)}} /> */}

        <Segmented block={true} options={[{value: 0, label: '编辑模式'}, {value: 1, label: '预览模式'}, {value: 2, label: '导出记录'}]} value={status} onChange={(v)=>{
          setStatus(parseInt(`${v}`))
          if(v===0) {
            setHighLight(true)
          } else if(v===1) {
            setHighLight(false)
          } else {
            // setHighLight(false)
            // out()
          }
        }} />
      </div>
      <div mt-4 p-2>
        <div bg='white' className='w-80 mx-auto shadow-xl rounded-md overflow-hidden' ref={ref} style={status===2?{position: 'absolute', top: '-1000px'}:{}}>
          <div pl-4 flex='~ justify-between'>
            {/* left */}
            <div className="w-[75%]">
              <img src="/maoyan-2.png" alt="logo" h-7 pt-3 pb-1 />
              <div text='sm'><HighText show={highLight} text='影院名称' eg='万达国际影城（福州台江店）' /></div>
              <div text='sm'>
                <HighText show={highLight} text='电影名称' eg='深海(3D)' />
                {/* (<HighText show={highLight} text='电影形式' eg='3D' />) */}
              </div>
              <div mt-1 flex='~ items-center justify-between'>
                <div text='sm'>
                  <HighText show={highLight} text='影厅' eg='1号VIP厅' />
                </div>
                <div>
                  <HighText show={highLight} text='开始时间' eg='19:00' />
                </div>
              </div>
              <div flex='~ items-center justify-between'>
                <div>
                  <HighText show={highLight} text='座位' eg='5排3号' />
                </div>
                <div>
                  <HighText show={highLight} text='开始日期' eg='2023-08-11' />
                </div>
              </div>
              <div flex='~' mt-1>
                <QRCode value={'https://sticker.hsott.cn/qrcode?text=qwqqwq'} bordered={false} className="-m-3" size={140} />
                <div ml-2>
                  <div text='xs'>票价：<HighText show={highLight} text='' eg='10' />元</div>
                  <div text='xs'>服务费：<HighText show={highLight} text='' eg='10'/>元</div>
                  <div text='xs'>
                    <HighText show={highLight} text='日期' eg='08-11' />
                    {' '}
                    <HighText show={highLight} text='时间' eg='15:24' />
                  </div>
                  <div text='xs' mt-3>
                    <HighText show={highLight} text='售票渠道' eg='网络售票' />
                  </div>
                  <div text='xs'>
                    <HighText show={highLight} text='机器码1' eg='13150000' />
                  </div>
                  <div text='xs'>
                    <HighText show={highLight} text='机器码2' eg='03352952' />
                  </div>
                </div>
              </div>
            </div>
            {/* right */}
            <div py-3 ml-4 className="w-[25%]">
              <div flex='~ justify-center'>
                <div px-2 className='py-0.5' rounded-full bg-red-500 text='white'>副券</div>
              </div>
              <div text='xs' mt-2>
                <HighText show={highLight} text='影厅' eg='9号VIP厅' />
              </div>
              <div text='xs'>
                <HighText show={highLight} text='座位' eg='5排3号' />
              </div>
              <div text='xs' mt-4>
                <HighText show={highLight} text='时间' eg='15:24' />
              </div>
              <div text='xs'>
                <HighText show={highLight} text='日期' eg='08-11' />
              </div>
              <div text='xs' mt-4>
                <HighText show={highLight} text='电影名称' eg='深海(3D)' />
              </div>
              <div text='xs' mt-4>
                <HighText show={highLight} text='票价' eg='20' />元
              </div>
              <div text='xs' mt-4>
                <HighText show={highLight} text='机器码1' eg='13150000' />
              </div>
              <div text='xs'>
                <HighText show={highLight} text='机器码2' eg='03352952' />
              </div>
            </div>
          </div>
          <div px-4 py-2 bg='red-500' mt-4 flex='~ items-center justify-between'>
            <div text='white xs'>凭此影票 入场观看</div>
            <img src="/maoyan-3.png" alt="logo" h-4 />
          </div>
        </div>

        {status===1?
          <Button className="mt-4 w-full mt-6" type="primary" onClick={out} flex='~ items-center justify-center' size='large'>
            <div className="i-ri-camera-fill" mr-1 text='lg' />
            导出图片
          </Button>:''
        }
        {/* <div></div> */}
        {status===2?
          <>
            {imageSrc.length === 0?
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='暂无数据' />:
              <>
                {imageSrc.map((v,k)=>(
                  <div key={k}>
                    <div>{v.time}</div>
                    <img src={v.data} alt="" w-full shadow-xl/>
                  </div>
                ))
                }
                  {/* <Spin tip="渲染图片中...如果长时间未出图请刷新">
                    <div className="h-30" />
                  </Spin> */}
              </>
            }
          </>:
          ''
        }
        
      </div>
    </div>
  )
}
