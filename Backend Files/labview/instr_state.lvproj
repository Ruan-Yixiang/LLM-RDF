<?xml version='1.0' encoding='UTF-8'?>
<Project Type="Project" LVVersion="20008000">
	<Property Name="varPersistentID:{3DE43D66-FA3E-4C99-AED1-2E39A5B77A23}" Type="Ref">/My Computer/state.lvlib/unchained</Property>
	<Property Name="varPersistentID:{65D4EB4C-9599-4E58-93D3-C45E7841B77E}" Type="Ref">/My Computer/state.lvlib/init_unchained</Property>
	<Property Name="varPersistentID:{6AB42A63-AD36-4D2F-8EFE-27E90424B2FD}" Type="Ref">/My Computer/state.lvlib/lc_arm</Property>
	<Property Name="varPersistentID:{D7AA6DB0-B900-481B-89CC-EDF70623F6B5}" Type="Ref">/My Computer/state.lvlib/init_thermo</Property>
	<Property Name="varPersistentID:{E1D53A0C-20C9-4E53-9537-1CBFF3E6D83D}" Type="Ref">/My Computer/state.lvlib/thermo</Property>
	<Item Name="My Computer" Type="My Computer">
		<Property Name="server.app.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="server.control.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="server.tcp.enabled" Type="Bool">false</Property>
		<Property Name="server.tcp.port" Type="Int">0</Property>
		<Property Name="server.tcp.serviceName" Type="Str">My Computer/VI Server</Property>
		<Property Name="server.tcp.serviceName.default" Type="Str">My Computer/VI Server</Property>
		<Property Name="server.vi.callsEnabled" Type="Bool">true</Property>
		<Property Name="server.vi.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="specify.custom.address" Type="Bool">false</Property>
		<Item Name="state.lvlib" Type="Library" URL="../state.lvlib"/>
		<Item Name="Dependencies" Type="Dependencies"/>
		<Item Name="Build Specifications" Type="Build"/>
	</Item>
</Project>
