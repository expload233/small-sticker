import { message } from "antd";
import { Button, Collapse, useToast, Tabs, Tab, TabList } from '@chakra-ui/react'
import { useCallback, useRef, useState } from "react";
import showImage from "../utils/downloadHtmlAsImage/showImage";
// import SecureWatermark from "../components/SecureWatermark";
import { useNavigate } from 'react-router-dom';
import ExportList from "../components/ExportList";
import { Outlet } from "react-router";
import isVip from "../utils/isVip";

export default function Heytea() {
  const toast = useToast()
  const navigate = useNavigate();

  const ref = useRef<HTMLDivElement>(null)
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const [imageSrc, setImageSrc] = useState<{ time: string, data: string }[]>([]);
  const [highLight, setHighLight] = useState<boolean>(true)
  const [status, setStatus] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const out = useCallback((n?: number) => {
    if (ref.current === null) {
      return
    }
    setIsLoading(true)

    try {
      showImage(ref.current, "PNG", true, n).then((imageData) => {
        if (imageData === 'data:,') {
          messageApi.open({
            key,
            type: 'error',
            content: '生成失败，请将控制台截图反馈给开发者',
          });
          setIsLoading(false)
        } else {
          setStatus(2)
          toast({
            description: "导出成功！长按图片即可保存",
            status: 'success',
            duration: 5000,
            variant: 'subtle'
          })
          setIsLoading(false)
        }
        setImageSrc((v) => [{ time: new Date().toLocaleString(), data: imageData }, ...v])
      })
    } catch (error) {
      console.log(error)
      toast({
        description: "生成失败，请将控制台截图反馈给开发者",
        status: 'error',
        duration: 9000,
      })
    }
  }, [ref, messageApi])

  return (
    <div>
      {contextHolder}
      <div flex='~ items-center' mb-4 bg-zinc-50 p-2 rounded-md>
        <div className="i-ri-lightbulb-fill w-4 h-4 mr-2 text-blue-500" />
        <div text='zinc-600 sm'>蓝色输入框可编辑，点击灰色文字快速填充哦！</div>
      </div>
      <div className='mb-4'>
        {/* <Segmented block={true} options={[{ value: 0, label: '编辑模式' }, { value: 1, label: '预览模式' }, { value: 2, label: '导出记录' }]} value={status} onChange={(v) => {
          console.log(highLight);

          setStatus(parseInt(`${v}`))
          if (v === 0) {
            setHighLight(true)
          } else if (v === 1) {
            setHighLight(false)
          }
        }} /> */}

        <Tabs index={status} isFitted variant='unstyled' className='bg-zinc-100 p-1 rounded-xl' onChange={(v)=>{
          setStatus(parseInt(`${v}`))
          if (v === 0) {
            setHighLight(true)
          } else if (v === 1) {
            setHighLight(false)
          }
        }}>
          <TabList className='gap-1'>
            <Tab className='hover:bg-gray-100 rounded-lg h-9' _selected={{ color: 'white', bg: '#2563EB', rounded: '0.5rem' }} >编辑</Tab>
            <Tab className='hover:bg-gray-100 rounded-lg h-9' _selected={{ color: 'white', bg: '#2563EB', rounded: '0.5rem' }} >预览</Tab>
            <Tab className='hover:bg-gray-100 rounded-lg h-9' _selected={{ color: 'white', bg: '#2563EB', rounded: '0.5rem' }} >导出记录</Tab>
          </TabList>
        </Tabs>

      </div>

      <div className=''>

        {status === 0 ?
          <button type="button" className="w-full py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 flex justify-center items-center" onClick={() => {
            setStatus(1)
            setHighLight(false)
          }}>
            <div>下一步</div>
            <div className="i-ri-arrow-right-line" ml-1 style={{ display: isLoading ? 'none' : 'block' }} />
          </button> : ''
        }
        {status === 1 ?
          <div className='p-2 bg-zinc-50 rounded-lg card'>
            <div className='text-xs mb-2 op50'>导出选项</div>
            <div className="flex gap-2">
              <Button variant='second' bg='white' className='w-full shadow-card border border-gray-200 hover:bg-gray-100' isLoading={isLoading} loadingText='导出中' onClick={() => {
                console.log('+ 导出');
                out(1.3)
              }}>
                {/* <div className="i-ri-flashlight-fill" mr-1 style={{ display: isLoading ? 'none' : 'block' }} /> */}
                急速 720P
              </Button>
              <Button variant='vip' className='w-full shadow-card' textColor=' text-zinc-800' isLoading={isLoading} loadingText='导出中' onClick={() => {
                console.log('+ 导出');
                if (isVip().is_vip) {
                  out(5)
                } else {
                  toast({
                    duration: 9000,
                    // isClosable: true,
                    render: () => (
                      <div className='bg-gradient-to-r from-[#E8BC86] to-[#E8C99B] text-zinc-800 p-2 rounded-md flex items-center text-lg'>
                        <div className="i-ri-vip-diamond-fill mx-2 text-xl" />
                        <div className='flex-1 font-bold'>VIP专享功能</div>
                        <Button bgColor='white' size='sm' onClick={() => { navigate('/user') }}>开通VIP</Button>
                      </div>
                    ),
                  })
                }
              }}>
                <div className="i-ri-vip-diamond-fill" mr-1 style={{ display: isLoading ? 'none' : 'block' }} />
                超清 4K
              </Button>
              <Button variant='vip' className='w-full shadow-card' textColor=' text-zinc-800' isLoading={isLoading} loadingText='导出中' onClick={() => {
                console.log('+ 导出');
                if (isVip().is_vip) {
                  out(10)
                } else {
                  toast({
                    duration: 9000,
                    // isClosable: true,
                    render: () => (
                      <div className='bg-gradient-to-r from-[#E8BC86] to-[#E8C99B] text-zinc-800 p-2 rounded-md flex items-center text-lg'>
                        <div className="i-ri-vip-diamond-fill mx-2 text-xl" />
                        <div className='flex-1 font-bold'>VIP专享功能</div>
                        <Button bgColor='white' size='sm' onClick={() => { navigate('/user') }}>开通VIP</Button>
                      </div>
                    ),
                  })
                }
              }}>
                <div className="i-ri-vip-diamond-fill" mr-1 style={{ display: isLoading ? 'none' : 'block' }} />
                极致 8K
              </Button>
            </div>
          </div> : ''
        }
        {status === 2 ?
          <button type="button" className="w-full py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 flex justify-center items-center" onClick={() => {
            setStatus(0)
            setHighLight(true)
          }}>
            <div className="i-ri-arrow-go-back-fill" mr-1 style={{ display: isLoading ? 'none' : 'block' }} />
            <div>返回编辑</div>
          </button> : ''
        }
      </div>
      <div font-sans className='relative'>
        <Collapse in={status === 2} animateOpacity className='pt-4' unmountOnExit>
          <div className='mb-4'>
            {!isVip().is_vip ?
              <div className='card px-2.5 py-1.5 bg-orange-50 text-orange-600 flex items-center'>
                <div className="i-ri-creative-commons-nc-fill mr-2 text-lg" />
                <div className='text-sm flex-1'>未获得商用授权 仅允许个人使用</div>
                <Button size='xs' colorScheme='orange' onClick={() => { navigate('/user') }}>获取授权</Button>
              </div> :
              <div className='card px-2.5 py-1.5 bg-green-50 text-green-600 flex items-center'>
                <div className="i-ri-money-dollar-circle-fill mr-2 text-lg" />
                <div className='text-sm flex-1'>已获得商用授权（不包含第三方Logo）</div>
              </div>
            }
          </div>
          <ExportList imageSrc={imageSrc} />
        </Collapse>
        <Collapse in={status !== 2} animateOpacity className='pt-4'>
          <Outlet context={[highLight, ref]} />
          <div className='flex justify-center'>
            {/* <div style={{border: '1px dashed rgb(226 228 233 / 1)', boxShadow: '0px 4px 7px 0px #00000008'}}>
              <div className='' >
                <SecureWatermark />
                
              </div>
            </div> */}
          </div>
        </Collapse>
      </div>
    </div>
  )
}
