import { Body, Controller, Get, HttpService, Post, Req } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as xml2js from 'xml2js';
import { from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { CaptchaResponse, VerifyTaxDTO } from './crawl.dto';

const mock = `

<html>  
<head>  
      
<title>Tổng cục Thuế - Bộ Tài chính</title>  
<link href="css/css.css" rel="stylesheet" type="text/css" /> 
<script src="/tcnnt/js/jquery-1.4.2.min.js"></script>
<script src="/tcnnt/js/jquery.tools.js"></script>  
 
</head>             
               
<body>     
	<div id="wrapper">     
    	<div id="content">   
            <div id="bgLeft">  
            </div><!--- End bgLeft --->  
            
            <div id="bgTop">
                <div id="bgTop1">
                </div>
                <div id="bgTop2">
                </div>         
            </div><!--- End bgTop --->
            
             <div id="bgRight">
            </div><!--- End bgRight ---> 
                       
            <div id="body"> 
            	<div id="top">
                	<div id="topBanner">
                    </div>
                    
                    <div id="topMenu">  
                    	<div id="menu">
                            <ul>
                                <li><a href="http://www.gdt.gov.vn"><span>Trang chủ</span></a></li>                                 
                            </ul>
                    	</div> 
                    </div><!--- End topMenu --->
                          
                    <!--- End topSubMenu ---> 
                </div><!--- End top --->
                   
                <div id="left">
                    <div class="module3Top">
                        <h1><a href="#">Tra cứu thông tin người nộp Thuế</a></h1>  
                    </div>
                    <div class="module3Body2"> 
                      	<div id="module3Content">
							<ul class="css-tabs">
								<li><a class="current" href="#"><b>Thông tin về người nộp thuế</b></a></li>	
								<li><a href="/tcnnt/mstcn.jsp" title="" target=""><b>Thông tin về người nộp thuế TNCN</b></a></li>
							</ul>
							<div class="css-panes">		 						
									


  
  

<div id="tcmst">   
   
		<script type="text/javascript">
			function submitform(id)
			{
				document.myform.id.value = id;
				document.myform.submit();
			}
			function clickexprise()
			{
			  document.myform.submit();  
			}
			function showProperties(url){
				  window.open(url, "popup", "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=600,height=500, left = 120,top = 60");
			}
			function gotoPage(page) {
				document.myform.page.value = page;
				var captchaVal=$.trim($("#captcha").val());
				if(captchaVal.length==0){
					$("#captcha").focus();
					alert("Nhập mã xác nhận để xem tiếp");
				}else{
					document.myform.submit();
				}	
			}
			function submitEnter(input,e){				
				$(this).keypress(function(e) {
					if (e.keyCode == '13') {						
						e.preventDefault();
						submitform();
					}
				});
			}
		</script>
		<style>
			.search_form td,.search_form th{
				padding: 5px 5px 5px 2px;
			}
			.search_form td input{
				width:220px;
				border:1px solid #969696;
			}
		</style>
	
		
		<form action="" method="post" name="myform">
			<input type="hidden" name="action" value="action">
			<input type="hidden" name="id"/>
			<input type="hidden" name="page" value="1" />
			<table class="search_form" width="100%" style="border-top: none;">
				<tr>
					<td align="right" style="width: 235px; font-weight: bold;">Xem danh sách Người nộp thuế ngừng hoạt động:</td>
					<td align="left">
						<input type="checkbox" name="exprise" style="width:13px; border: none;" value="exprise" onclick="clickexprise();"  >
					</td>
				</tr>
				
				<tr>
					<td align="right">Mã số thuế</td>
					<td><input type="text" name="mst" value="0309532909" style=" border: 1px solid #969696;"  onKeyPress="return submitEnter(this,event)"></td>
				</tr>
				
				<tr>
					<td align="right">Tên tổ chức cá nhân nộp thuế</td>
					<td><input type="text" name="fullname" value="" style=" border: 1px solid #969696;"  onKeyPress="return submitEnter(this,event)"></td>
				</tr>
				<tr>
					<td align="right">Địa chỉ trụ sở kinh doanh</td>
					<td><input type="text" name="address" value="" style=" border: 1px solid #969696;"  onKeyPress="return submitEnter(this,event)"></td>
				</tr>
				<tr>
					<td align="right">Số chứng minh thư/Thẻ căn cước người đại diện</td>
					<td><input type="text" name="cmt" value="" style=" border: 1px solid #969696;"  onKeyPress="return submitEnter(this,event)"></td>
				</tr>				
				<tr>
					<td align="right">Mã xác nhận<span style="color:red;">*</span></td>
					<td colspan="2" valign="top">
						<table>
							<tr>
								<td><input autocomplete="off" style="width:100px;height:18px;" type="text" name="captcha" id="captcha"/></td>
								<td><div><img height="45"  src="/tcnnt/captcha.png?uid=6ecfe18e-86a6-49da-88c4-c514b38fdb1c" /></div></td>								
							</tr>
						</table> 
					</td>         
				</tr>
				<tr>
					<td></td>
					<td>
						  <div style="width: 150px;">							
							<input type="button" value="" class="subBtn" style="float:left;border:none;width:69px;cursor:pointer;" onclick="gotoPage(1);" />
							<input value="" class="retype" style="float: right;border:none; width:67px;" type="reset" />
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="2" style="font-size: 11px; color: rgb(255, 0, 0);">&nbsp;Lưu ý: Sử dụng font Unicode (TCVN:6909:2001 dạng dựng sẵn) để nhập tiếng Việt có dấu.</td>
				</tr>
			</table>
		</form>
		
					<br/>
					<div style="float:left;">
						<h3 style="font-weight: bold; margin: 5px 0; font-size: 14px;">BẢNG THÔNG TIN TRA CỨU:</h3>						
					</div>
					<div style="float:right;margin: 5px 0">							
						Trang:
							
							
							&nbsp;
							<a href="javascript:gotoPage(2)"  style="color:#C4141B">
								>>
							</a>
					</div>
					<table class="ta_border">
						<tr>
							<th style="text-align:center; width: 15px;">STT</th>
							<th style="text-align:center; width: 70px;">MST</th>
							<th style="text-align:center; width: 120px;">T&#234;n ng&#432;&#7901;i n&#7897;p thu&#7871;</th>
							<th style="text-align:center;">Cơ quan thuế</th>
							<th style="text-align:center; width: 100px;">S&#7889; CMT/Thẻ căn cước</th>
							<th style="text-align:center; width: 70px;">Ngày thay đổi thông tin gần nhất</th>
							<th style="text-align:center; width: 200px;">Ghi ch&#250;</th>
						</tr>
						
						<tr>
						   <td align="center">
							<a>1</a>
						   </td>
						   <td>
							 <a>0309532909</a>
						  </td>
						   <td>
							 <a href="javascript:submitform('0309532909')" title="Địa chỉ trụ sở: 29/1 Đường số 4, Khu phố 3"><b>CÔNG TY CỔ PHẦN TI KI</b></a>
						  </td>
						   <td>
							 <a>Cục Thuế Thành phố Hồ Chí Minh</a>
						  </td>
						  <td>
							 <a>023471106</a>
						  </td>
						  <td>
							 <a alt="Ngày thay đổi">21/09/2020</a>
						  </td>						  
						  <td>
							 <a alt="00">NNT đang hoạt động (đã được cấp GCN ĐKT)</a>
						  </td>
						</tr>
						
						<tr style="background: none repeat scroll 0% 0% rgb(242, 242, 242);">
						   <td align="center">
							<a>2</a>
						   </td>
						   <td>
							 <a>0309532909-001</a>
						  </td>
						   <td>
							 <a href="javascript:submitform('0309532909-001')" title="Địa chỉ trụ sở: tầng 5, tòa nhà VIT Tower, số 519 Kim Mã"><b>CÔNG TY CỔ PHẦN TI KI - CHI NHÁNH HÀ NỘI</b></a>
						  </td>
						   <td>
							 <a>Chi cục Thuế Quận Đống đa</a>
						  </td>
						  <td>
							 <a>023471106</a>
						  </td>
						  <td>
							 <a alt="Ngày thay đổi">27/09/2019</a>
						  </td>						  
						  <td>
							 <a alt="00">NNT đang hoạt động (đã được cấp GCN ĐKT)</a>
						  </td>
						</tr>
						
						<tr>
						   <td align="center">
							<a>3</a>
						   </td>
						   <td>
							 <a>0309532909-002</a>
						  </td>
						   <td>
							 <a href="javascript:submitform('0309532909-002')" title="Địa chỉ trụ sở: 295 Nguyễn Văn Linh"><b>CHI NHÁNH CÔNG TY CỔ PHẦN TI KI - KHO CẦN THƠ</b></a>
						  </td>
						   <td>
							 <a>Cục Thuế Thành phố Cần Thơ</a>
						  </td>
						  <td>
							 <a>556916644</a>
						  </td>
						  <td>
							 <a alt="Ngày thay đổi">16/09/2020</a>
						  </td>						  
						  <td>
							 <a alt="03">NNT ngừng hoạt động nhưng chưa hoàn thành thủ tục đóng MST</a>
						  </td>
						</tr>
						
						<tr style="background: none repeat scroll 0% 0% rgb(242, 242, 242);">
						   <td align="center">
							<a>4</a>
						   </td>
						   <td>
							 <a>0309532909-003</a>
						  </td>
						   <td>
							 <a href="javascript:submitform('0309532909-003')" title="Địa chỉ trụ sở: 146 Duy Tân"><b>CHI NHÁNH CÔNG TY CỔ PHẦN TI KI - KHO ĐÀ NẴNG</b></a>
						  </td>
						   <td>
							 <a>Cục Thuế TP Đà Nẵng</a>
						  </td>
						  <td>
							 <a>556916644</a>
						  </td>
						  <td>
							 <a alt="Ngày thay đổi">25/11/2020</a>
						  </td>						  
						  <td>
							 <a alt="03">NNT ngừng hoạt động nhưng chưa hoàn thành thủ tục đóng MST</a>
						  </td>
						</tr>
						
						<tr>
						   <td align="center">
							<a>5</a>
						   </td>
						   <td>
							 <a>0309532909-004</a>
						  </td>
						   <td>
							 <a href="javascript:submitform('0309532909-004')" title="Địa chỉ trụ sở: Khu Công Nghiệp Đồng Hòa, Đường Quán Trữ"><b>CHI NHÁNH CÔNG TY CỔ PHẦN TI KI - KHO HẢI PHÒNG</b></a>
						  </td>
						   <td>
							 <a>Cục Thuế TP Hải Phòng</a>
						  </td>
						  <td>
							 <a>556916644</a>
						  </td>
						  <td>
							 <a alt="Ngày thay đổi">31/10/2019</a>
						  </td>						  
						  <td>
							 <a alt="00">NNT đang hoạt động (đã được cấp GCN ĐKT)</a>
						  </td>
						</tr>
						
						<tr style="background: none repeat scroll 0% 0% rgb(242, 242, 242);">
						   <td align="center">
							<a>6</a>
						   </td>
						   <td>
							 <a>0309532909-005</a>
						  </td>
						   <td>
							 <a href="javascript:submitform('0309532909-005')" title="Địa chỉ trụ sở: Số 12 Đường Phú Trung"><b>CHI NHÁNH CÔNG TY CỔ PHẦN TI KI - KHO NHA TRANG</b></a>
						  </td>
						   <td>
							 <a>Chi cục Thuế Thành phố Nha Trang</a>
						  </td>
						  <td>
							 <a>556916644</a>
						  </td>
						  <td>
							 <a alt="Ngày thay đổi">06/10/2020</a>
						  </td>						  
						  <td>
							 <a alt="03">NNT ngừng hoạt động nhưng chưa hoàn thành thủ tục đóng MST</a>
						  </td>
						</tr>
						
						<tr>
						   <td align="center">
							<a>7</a>
						   </td>
						   <td>
							 <a>0309532909-006</a>
						  </td>
						   <td>
							 <a href="javascript:submitform('0309532909-006')" title="Địa chỉ trụ sở: Tầng 3, Tháp A, Tòa Nhà Viettel, Số 285 Cách Mạng Tháng Tám"><b>VIETTEL TOWER - CHI NHÁNH CÔNG TY CỔ PHẦN TI KI</b></a>
						  </td>
						   <td>
							 <a>Cục Thuế Thành phố Hồ Chí Minh</a>
						  </td>
						  <td>
							 <a>023471106</a>
						  </td>
						  <td>
							 <a alt="Ngày thay đổi">16/01/2019</a>
						  </td>						  
						  <td>
							 <a alt="00">NNT đang hoạt động (đã được cấp GCN ĐKT)</a>
						  </td>
						</tr>
						
						<tr style="background: none repeat scroll 0% 0% rgb(242, 242, 242);">
						   <td align="center">
							<a>8</a>
						   </td>
						   <td>
							 <a>0309532909-007</a>
						  </td>
						   <td>
							 <a href="javascript:submitform('0309532909-007')" title="Địa chỉ trụ sở: Thôn Chí Trung"><b>CHI NHÁNH CÔNG TY CỔ PHẦN TI KI - KHO HƯNG YÊN</b></a>
						  </td>
						   <td>
							 <a>Cục Thuế Tỉnh Hưng Yên</a>
						  </td>
						  <td>
							 <a>172433356</a>
						  </td>
						  <td>
							 <a alt="Ngày thay đổi">21/07/2020</a>
						  </td>						  
						  <td>
							 <a alt="01">NNT ngừng hoạt động và đã đóng MST</a>
						  </td>
						</tr>
						
							<tr>
								<td colspan="6" style="font-size: 11px; color: rgb(255, 0, 0);border-right:none;">Lưu ý: Các tổ chức, cá nhân khi đăng tải, trích dẫn lại thông tin phải được sự đồng ý bằng văn bản của Tổng cục Thuế.</td>
				
								<td border="0" align="right" style="border-left:none;"> 
								
								
								Trang: 
									
									
									&nbsp;
									<a href="javascript:gotoPage(2)"  style="color:#C4141B">
										>>
									</a>
								</td>
							</tr>	
						
					</table>
			
		

	
	


</div>                 
							</div>
                   		</div>
                    </div><!--- End module3 --->         
                </div><!--- End left --->
                  
                      
            </div><!--- End body --->
            
            <div id="bgBottom">
                <div id="bgBottom1">
                </div>
                <div id="bgBottom2">
                </div>                
            </div><!--- End bgBottom --->
		</div><!--- End content --->
        <div id="overlay_wap" class="simple_overlay">		    
			<div id="wap_content" style="overflow:scroll;height:500px;">
			</div>		   
		</div>
		   
		<script language="javascript">
			function showVB(url){
			  window.open(url, "popup", "directories=0,toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0,width=800,height=500, left = 120,top = 60");
			}
			$(document).ready(function() {		
				$('input[rel="#overlay_wap"]').overlay({
					onBeforeLoad: function() {
							/*var wap_content = jQuery("#wap_content");
							wap_content.load(this.getTrigger().attr("link"));
							*/
							var wap_content = jQuery("#wap_content");
							$.ajax({
								'url': this.getTrigger().attr("link"),
								'type': 'POST',
								'data': $('#loadFrm').serialize(),
								'success': function(result){
									 wap_content.html(result);
								}
							});
					}
				});
			});			  
		</script>

        <div id="footer">        	
        	<h1>Thuế Việt Nam - Trang thông tin điện tử của Tổng cục Thuế </h1>
            <p>	Cơ quan chủ quản: Bộ Tài chính - Số giấy phép: 207/GP-BC ngày 14/05/2004 do Cục Báo chí - Bộ VHTT cấp<br />
				Địa chỉ: 123 Lò Đúc, phường Đống Mác, quận Hai Bà Trưng, TP Hà Nội | Điện thoại: (024) 39712310 | Fax: (024) 39712286<br />
				Ghi rõ nguồn "http://www.gdt.gov.vn" khi phát hành thông tin từ website này</p>
        </div><!--- End footer --->
	</div><!--- End wrapper ---> 
</body>
</html> 
                    <script id="f5_cspm">(function(){var f5_cspm={f5_p:'HIFFKAMOPEPBBHEDJCOIDDBHLKPKFFBHPPPHIFHHDEAGBGBGGNFELNOIEFPOALGMINFBJGHKGDLBNBEIAKCAKLHAABDJFPNHAOJKELMMHBFDBKCEFPELIBPHNPBGKGJN',setCharAt:function(str,index,chr){if(index>str.length-1)return str;return str.substr(0,index)+chr+str.substr(index+1);},get_byte:function(str,i){var s=(i/16)|0;i=(i&15);s=s*32;return((str.charCodeAt(i+16+s)-65)<<4)|(str.charCodeAt(i+s)-65);},set_byte:function(str,i,b){var s=(i/16)|0;i=(i&15);s=s*32;str=f5_cspm.setCharAt(str,(i+16+s),String.fromCharCode((b>>4)+65));str=f5_cspm.setCharAt(str,(i+s),String.fromCharCode((b&15)+65));return str;},set_latency:function(str,latency){latency=latency&0xffff;str=f5_cspm.set_byte(str,40,(latency>>8));str=f5_cspm.set_byte(str,41,(latency&0xff));str=f5_cspm.set_byte(str,35,2);return str;},wait_perf_data:function(){try{var wp=window.performance.timing;if(wp.loadEventEnd>0){var res=wp.loadEventEnd-wp.navigationStart;if(res<60001){var cookie_val=f5_cspm.set_latency(f5_cspm.f5_p,res);window.document.cookie='f5avr1826516668aaaaaaaaaaaaaaaa='+encodeURIComponent(cookie_val)+';path=/';}
return;}}
catch(err){return;}
setTimeout(f5_cspm.wait_perf_data,100);return;},go:function(){var chunk=window.document.cookie.split(/\s*;\s*/);for(var i=0;i<chunk.length;++i){var pair=chunk[i].split(/\s*=\s*/);if(pair[0]=='f5_cspm'&&pair[1]=='1234')
{var d=new Date();d.setTime(d.getTime()-1000);window.document.cookie='f5_cspm=;expires='+d.toUTCString()+';path=/;';setTimeout(f5_cspm.wait_perf_data,100);}}}}
f5_cspm.go();}());</script>`;

@Controller({ path: '/crawl' })
export class CrawlController {
  constructor(private httpService: HttpService) {}

  @Get('government-tax')
  async getGovermentCaptcha(): Promise<CaptchaResponse> {
    const captchaUrl = 'captcha.png';
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.goto('http://tracuunnt.gdt.gov.vn/tcnnt/mstdn.jsp', {
      // waitUntil: 'networkidle0',
    });
    const captchaResponse = await page.waitForResponse((response) => {
      return response.url().includes(captchaUrl) && response.status() === 200;
    });
    const cookies = await page.cookies();

    const captchaBuffer = await captchaResponse.buffer();
    const cookie = cookies.find((cookie) => cookie.name === 'JSESSIONID');
    return {
      sessionId: cookie?.value,
      captchaImage: `data:image/png;base64,${captchaBuffer.toString('base64')}`,
    };
  }

  @Post('government-tax')
  verifyTax(@Req() req) {

	console.log(req);

    // const formData = new FormData();

    // formData.append('mst', verifyTaxDTO.taxCode);
    // formData.append('captcha', verifyTaxDTO.captcha);
    // formData.append('page', '1');
    // formData.append('action', 'action');

    // const parser = new xml2js.Parser();
    //  parser.parseString(mock, (a, b) => {
    //   console.log(a)
    //   console.log(b)
    //  });
    return true;

    return this.httpService
      .post('http://tracuunnt.gdt.gov.vn/tcnnt/mstdn.jsp', '')
      .pipe(
        map((response) => {
          const parser = new xml2js.Parser();
          return from(parser.parseStringPromise(response));
        }),
        tap(console.log),
      );
  }
}
