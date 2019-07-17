function(ct, ar) // { t:#s. , p:#s.}
{
	//hackmud t2 scraper by ice
	let c_s = function(x,y,s){
		var m = Math.floor(s/2);
		var l=(m-3),p=(m+3),q=(s-10),w=(s-4),
		e=x>l&&x<p,r=y>l&&y<p,t=x<w&&x>q,u=y<w&&y>q;
		return (x==6||y==6||y<9&&x<9||
			x<9&&y>s-9||y<9&&x>s-9||
			x<7&&y>s-12||y<7&&x>s-12||
			y>3&&y<9&&e||x>3&&x<9&&r||
			e&&r||e&&u||r&&t||u&&t);
	}
	let b2d = function(bs,x){
		var b = 0, e = 128;
		for(var i = 0;i<8;i++){
			b+=bs[x+i]*e;
			e/=2;
		}
		return b;
	}
	let g2bs = function(g,s){
		var bs = [];
		var y = s-1,x = s-1;
		var up = true, d = false;
		while(!d){
			if(g[x][y]!=2){bs.push(g[x][y])}
			x--;
			if(g[x][y]!=2){bs.push(g[x][y])}
			if(up){
				y--;
				if(y<0){
					x = (x==7)?x=5:x-1;
					y=0;
					up=!up;
				} else {
					x++;
				}
			} else {
				y++;
				if(y>=s){
					x = (x==7)?x=5:x-1;
					y=s-1;
					up=!up;
				} else{
					x++;
				}
			}
			if(x<0){d=true;}
		}
		return bs;
	}
	let qr_c = function(qr){
		var li = qr.split('\n');
		var s = li[0].length;
		var r = "";
		var gy = 0,
			gx = 0;
		var g = [];
		while (gy<s){
			var nl = [];
			while (gx<s){nl.push(0);gx++;}
			gx=0;g.push(nl);gy++;
		}
		for(var f = 0;f < s;f+=2){
			for (var i = 0;i < s;i++){
				var b = [0,0];
				switch(li[f/2][i]){
					case "â–ˆ":
						b=[1,1];
						break;
					case "â–€":
						b=[1,0];
						break;
					case "â–„":
						b=[0,1];
						break;
				}
				g[i][f] = b[0];
				g[i][f+1] = b[1];
			}
		}
		g[2][8] ^= 1;
		g[4][8] ^= 1;
		var mask = g[2][8]*4 + g[3][8]*2 + g[4][8];
		for(var i = 0;i < s;i++){
			for(var j = 0;j < s;j++){
				var t = ((((i+j)%2)+i*j%3)%2==0);
				switch(mask){
					case 0:
						t=(i+j)%2==0;break;
					case 1:
						t=(i%2)==0;break;
					case 2:
						t=(j%3)==0;break;
					case 3:
						t=(i+j)%3==0;break;
					case 4:
						t=((i>>1)&0x01)==((j/3)&0x01);break;
					case 5:
						t=((i*j)%2+i*j%3)==0;break;
					case 6:
						t=((i*j)%2+i*j%3)%2==0;break;
				}
				if(t){g[j][i] ^= 1;}
				if(c_s(i,j,s)){
					g[j][i] = 2;
				}

			}
		}
		var bs = g2bs(g,s);
		var dm = [], bi=0,r2=12,r3=4;
		switch(s){
			case 49:r2=14;r3=2;break;
			case 45:r2=13;r3=1;break;
		}
		var bk = [];
		for(var w = 0;w < 4+r3;w++){
			bk.push([]);
		}
		for(var q = 0;q < r2;q++){
			for(var w = 0;w < (4+r3);w++){
				for(var i = 0;i < 8;i++){
					bk[w].push(bs[bi+i]);
				}
				bi+=8;
			}
		}
		for(var w = 4;w < (4+r3);w++){
			for(var i = 0;i < 8;i++){
				bk[w].push(bs[bi+i]);
			}
			bi+=8;
		}
		for(var bq in bk){
			var bb = bk[bq].length,bc=bk[bq];
			for(var i=0;i<bb;i++){
				dm.push(bc[i])
			}
		}
		bi=68;
		while(bi<112){
			r += String.fromCharCode(b2d(dm,bi));
			bi+=8;
		}
		return r;
	}
	var c = ["cmd","entry","action","command","navigation","process","nav","see","open","show","get"];
	var l = ["news_posts","posts","plan","news","blog","updates","developments","happening","list","latest"];
	var cc = 0, lc = 0, mc = -1, m = "", r = "", k = {},t = ar.t.call, p = ar.p.call, d = false;
	for(var i = 0;i<c.length;i++){
		for(var j = 0;j<l.length;j++){
			k[c[i]] = l[j];
			r = p(k);
			if((r.indexOf("specify")==-1)&&(r.indexOf("criminal")==-1)&&(r.indexOf("password")==-1)){
				cc=i;
				lc=j;
			}
		}
		k={};
	}
	k[c[cc]] = l[lc];
	var pl = p(k);
	var rusrs = [];
	while(pl.length>0){
		var nx = pl.pop(), ni = nx.indexOf("--"), ne = nx.indexOf("when be");
		if(ni!=-1){
			rusrs.push(nx.slice(ni+3,ne-1));
		}
	}
	var usrs = [];
	while(rusrs.length>0){
		var nx = rusrs.pop();
		k = {};
		k["username"] = nx;
		r = t(k);
		if(r.indexOf("t ex")==-1){
			usrs.push(nx);
			while(!d){
				mc++;
				k[c[mc]] = "account";
				r = t(k);
				d = (r.indexOf("r_co")!=-1);
			}
		}
	}
	if(usrs.length==0){
		return { ok:false , msg:"no users"};
	}
	var qrs = {};
	for(var i = 0; i < usrs.length;i++){
		k = {};
		var n = usrs[i];
		qrs[n] = [];
		k["username"] = n;
		k[c[mc]] = "order_qrs";
		r = t(k);
		while(r.length>0){
			var nx = r.pop();
			if(nx.indexOf("issi")==-1){
				qrs[n].push(nx);
			}
		}
	}
	k[c[mc]] = "cust_service";
	var ll = [];
	var tl = 0;
	var tmx = 999;
	if(ar.c!=null){
		tmx = ar.c;
	}
	for(var i = 0; i <usrs.length;i++){
		var q = qrs[usrs[i]];
		if(tl<tmx){
			for(var j = 0; j < q.length;j++){
				k["order_id"] = qr_c(q[j]);
				r = t(k);
				var lc = r.indexOf("cs:");
				if(lc!=-1){
					var nl = r.slice(lc+4, r.length-26).split(" ");
					while(nl.length>0){
						ll.push(nl.pop());
						tl++;
					}
				}
			}
		}
	}
	var pr = ct.caller;
	if(ar.u!=null){
		pr = ar.u;
	}
	while(ll.length>0){
		var nl = ll.pop();
		if (nl.indexOf("<")==-1){
			m += pr + ".brute_t2{t:#s." + nl;
			if(ar.co==true){
				m += ", co:true";
			}
			m+="}\n";
		}
	}
	return { ok:true , msg:m};
}