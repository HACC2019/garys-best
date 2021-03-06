USE [master]
GO
/****** Object:  Database [HecoDB]    Script Date: 11/14/2019 8:41:59 PM ******/
CREATE DATABASE [HecoDB]
GO
ALTER DATABASE [HecoDB] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [HecoDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [HecoDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [HecoDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [HecoDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [HecoDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [HecoDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [HecoDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [HecoDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [HecoDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [HecoDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [HecoDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [HecoDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [HecoDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [HecoDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [HecoDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [HecoDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [HecoDB] SET ALLOW_SNAPSHOT_ISOLATION ON 
GO
ALTER DATABASE [HecoDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [HecoDB] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [HecoDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [HecoDB] SET  MULTI_USER 
GO
ALTER DATABASE [HecoDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [HecoDB] SET ENCRYPTION ON
GO
ALTER DATABASE [HecoDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [HecoDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 100, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO)
GO
USE [HecoDB]
GO
ALTER DATABASE SCOPED CONFIGURATION SET ACCELERATED_PLAN_FORCING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET BATCH_MODE_ADAPTIVE_JOINS = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET BATCH_MODE_MEMORY_GRANT_FEEDBACK = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET BATCH_MODE_ON_ROWSTORE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET DEFERRED_COMPILATION_TV = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET ELEVATE_ONLINE = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET ELEVATE_RESUMABLE = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET GLOBAL_TEMPORARY_TABLE_AUTO_DROP = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET INTERLEAVED_EXECUTION_TVF = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET ISOLATE_SECURITY_POLICY_CARDINALITY = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LAST_QUERY_PLAN_STATS = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LIGHTWEIGHT_QUERY_PROFILING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET OPTIMIZE_FOR_AD_HOC_WORKLOADS = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PAUSED_RESUMABLE_INDEX_ABORT_DURATION_MINUTES = 1440;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET ROW_MODE_MEMORY_GRANT_FEEDBACK = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET VERBOSE_TRUNCATION_WARNINGS = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET XTP_PROCEDURE_EXECUTION_STATISTICS = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET XTP_QUERY_EXECUTION_STATISTICS = OFF;
GO
USE [HecoDB]
GO
/****** Object:  Table [dbo].[ForecastOutputEnergyTbl]    Script Date: 11/14/2019 8:42:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ForecastOutputEnergyTbl](
	[ForecastOutputEnergyID] [bigint] IDENTITY(1,1) NOT NULL,
	[StationName] [varchar](50) NOT NULL,
	[Timestamp] [date] NOT NULL,
	[Energy] [decimal](18, 2) NOT NULL,
	[ErrorRounding] [decimal](18, 2) NOT NULL,
	[ErrorCalculation] [decimal](18, 2) NOT NULL,
	[OnPeak] [decimal](18, 2) NOT NULL,
	[MidDay] [decimal](18, 2) NOT NULL,
	[OffPeak] [decimal](18, 2) NOT NULL,
	[PortType_CHADEMO] [decimal](18, 2) NOT NULL,
	[PortType_DCCOMBOTYP1] [decimal](18, 2) NOT NULL,
	[PaymentMode_CreditCard] [decimal](18, 2) NOT NULL,
	[PaymentMode_RFID] [decimal](18, 2) NOT NULL,
	[SessionTypeMobile] [decimal](18, 2) NOT NULL,
	[SessionTypeWeb] [decimal](18, 2) NOT NULL,
	[SessionTypeDevice] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_ForecastOutputEnergyTbl] PRIMARY KEY CLUSTERED 
(
	[ForecastOutputEnergyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HecoRewardsSurveyTbl]    Script Date: 11/14/2019 8:42:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HecoRewardsSurveyTbl](
	[HecoRewardsSurveyID] [bigint] IDENTITY(1,1) NOT NULL,
	[StationID] [bigint] NOT NULL,
	[LicensePlate] [varchar](8) NOT NULL,
	[DidTheCarCharge] [bit] NOT NULL,
	[CardDeclined] [bit] NULL,
	[CardReaderBroken] [bit] NULL,
	[IsTesla] [bit] NULL,
	[PortType] [varchar](50) NULL,
	[AdditionalComments] [nvarchar](255) NULL,
	[Timestamp] [datetime] NOT NULL,
 CONSTRAINT [PK_HecoRewardsSurveyTbl] PRIMARY KEY CLUSTERED 
(
	[HecoRewardsSurveyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HecoRewardsTbl]    Script Date: 11/14/2019 8:42:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HecoRewardsTbl](
	[HecoRewardsID] [bigint] IDENTITY(1,1) NOT NULL,
	[LicensePlate] [varchar](8) NOT NULL,
	[Points] [int] NOT NULL,
 CONSTRAINT [PK_HecoRewardsTbl] PRIMARY KEY CLUSTERED 
(
	[HecoRewardsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StationCheckinTbl]    Script Date: 11/14/2019 8:42:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StationCheckinTbl](
	[StationCheckinID] [bigint] IDENTITY(1,1) NOT NULL,
	[StationID] [bigint] NOT NULL,
	[LicensePlate] [varchar](8) NOT NULL,
	[Timestamp] [datetime] NOT NULL,
 CONSTRAINT [PK_StationCheckinTbl] PRIMARY KEY CLUSTERED 
(
	[StationCheckinID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StationDataHistoricalTbl]    Script Date: 11/14/2019 8:42:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StationDataHistoricalTbl](
	[HistoricalID] [bigint] IDENTITY(1,1) NOT NULL,
	[StationName] [varchar](50) NULL,
	[Timestamp] [datetime] NOT NULL,
	[Energy] [decimal](15, 2) NULL,
	[Amount] [decimal](15, 2) NULL,
	[OnPeak] [decimal](15, 2) NULL,
	[MidDay] [decimal](15, 2) NULL,
	[OffPeak] [decimal](15, 2) NULL,
	[CorrectAmount] [decimal](15, 2) NULL,
	[ErrorRounding] [decimal](15, 2) NULL,
	[ErrorCalculation] [decimal](15, 2) NULL,
	[SessionTypeDevice] [decimal](15, 2) NULL,
	[SessionTypeMobile] [decimal](15, 2) NULL,
	[SessionTypeWeb] [decimal](15, 2) NULL,
	[PortType_CHADEMO] [decimal](15, 2) NULL,
	[PortType_DCCOMBOTYP1] [decimal](15, 2) NULL,
	[PaymentMode_CreditCard] [decimal](15, 2) NULL,
	[PaymentMode_RFID] [decimal](15, 2) NULL,
	[CorrectDuration] [decimal](15, 2) NULL,
 CONSTRAINT [PK_StationDataHistoricalTbl] PRIMARY KEY CLUSTERED 
(
	[HistoricalID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StationDataTbl]    Script Date: 11/14/2019 8:42:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StationDataTbl](
	[StationID] [bigint] IDENTITY(1,1) NOT NULL,
	[StationName] [varchar](50) NOT NULL,
	[SessionInitiated] [varchar](50) NOT NULL,
	[StartTime] [datetime] NOT NULL,
	[EndTime] [datetime] NOT NULL,
	[Duration] [varchar](50) NOT NULL,
	[Energy] [decimal](18, 2) NOT NULL,
	[SessionAmount] [varchar](50) NOT NULL,
	[SessionID] [bigint] NOT NULL,
	[PortType] [varchar](50) NOT NULL,
	[PaymentMode] [varchar](50) NOT NULL,
 CONSTRAINT [PK_StationDataTbl] PRIMARY KEY CLUSTERED 
(
	[StationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StationLocationTbl]    Script Date: 11/14/2019 8:42:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StationLocationTbl](
	[StationLocationID] [bigint] NOT NULL,
	[StationID] [bigint] NOT NULL,
	[StationLocation] [varchar](255) NOT NULL,
 CONSTRAINT [PK_StationLocationTbl] PRIMARY KEY CLUSTERED 
(
	[StationLocationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StationMasterTbl]    Script Date: 11/14/2019 8:42:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StationMasterTbl](
	[StationID] [bigint] IDENTITY(1,1) NOT NULL,
	[StationName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_StationMasterTbl] PRIMARY KEY CLUSTERED 
(
	[StationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[HecoRewardsSurveyTbl] ADD  CONSTRAINT [DF_HecoRewardsSurveyTbl_Timestamp]  DEFAULT (getdate()) FOR [Timestamp]
GO
ALTER TABLE [dbo].[HecoRewardsTbl] ADD  CONSTRAINT [DF_HecoRewardsTbl_Points]  DEFAULT ((0)) FOR [Points]
GO
ALTER TABLE [dbo].[StationCheckinTbl] ADD  CONSTRAINT [DF_StationCheckinTbl_Timestamp]  DEFAULT (getdate()) FOR [Timestamp]
GO
ALTER TABLE [dbo].[HecoRewardsSurveyTbl]  WITH CHECK ADD  CONSTRAINT [FK_HecoRewardsSurveyTbl_StationMasterTbl] FOREIGN KEY([StationID])
REFERENCES [dbo].[StationMasterTbl] ([StationID])
GO
ALTER TABLE [dbo].[HecoRewardsSurveyTbl] CHECK CONSTRAINT [FK_HecoRewardsSurveyTbl_StationMasterTbl]
GO
ALTER TABLE [dbo].[StationCheckinTbl]  WITH CHECK ADD  CONSTRAINT [FK_StationMasterTbl_StationCheckinTbl] FOREIGN KEY([StationID])
REFERENCES [dbo].[StationMasterTbl] ([StationID])
GO
ALTER TABLE [dbo].[StationCheckinTbl] CHECK CONSTRAINT [FK_StationMasterTbl_StationCheckinTbl]
GO
ALTER TABLE [dbo].[StationLocationTbl]  WITH CHECK ADD  CONSTRAINT [FK_StationLocationTbl_StationMasterTbl] FOREIGN KEY([StationID])
REFERENCES [dbo].[StationMasterTbl] ([StationID])
GO
ALTER TABLE [dbo].[StationLocationTbl] CHECK CONSTRAINT [FK_StationLocationTbl_StationMasterTbl]
GO
/****** Object:  StoredProcedure [dbo].[HecoRewards_GetPoints_Proc]    Script Date: 11/14/2019 8:42:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Joshua Nishiguchi
-- Create date: 11/2/2019
-- Description:	When a user goes on their phone and checks their points, if it's their first time on the app
--				they won't exist in the HecoRewardsTbl. Therefore, insert them and return 0 points. Otherwise,
--				return how mnay points they have
-- =============================================
CREATE PROCEDURE [dbo].[HecoRewards_GetPoints_Proc] 
	@LicensePlate varchar(8)
AS
BEGIN
	SET NOCOUNT ON

	IF EXISTS(SELECT HecoRewardsID FROM HecoRewardsTbl WHERE LicensePlate = @LicensePlate)
	BEGIN
		SELECT Points FROM dbo.HecoRewardsTbl WHERE LicensePlate = @LicensePlate
	END
	ELSE
	BEGIN
		INSERT INTO dbo.HecoRewardsTbl (
			LicensePlate,
			Points
		)
		VALUES (@LicensePlate, 0)

		SELECT 0 as Points
	END
END
GO
/****** Object:  StoredProcedure [dbo].[HecoRewards_InsertSurvey_Proc]    Script Date: 11/14/2019 8:42:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Joshua Nishiguchi
-- Create date: 11/2/2019
-- Description:	Insert survey
-- =============================================
CREATE PROCEDURE [dbo].[HecoRewards_InsertSurvey_Proc]
	@LicensePlate varchar(8),
	@DidTheCarCharge bit,
	@CardDeclined bit,
	@CardReaderBroken bit,
	@IsTesla bit,
	@PortType varchar(50),
	@AdditionalComments nvarchar(255)
AS
BEGIN
	
	SET NOCOUNT ON
	
	--Currtime of proc run
	DECLARE @CurrTime as datetime
	DECLARE @StationID bigint

	SET @CurrTime = GETDATE()
	
	--We don't care if a user has done a survey in under 24 hours; as long as it is at a DIFFERENT STATION
	--Check if person's car has checked into a station within the last 24 hours

	--ASSUMPTIONS
	--User will be filling out a survey for the station they LAST VISITED

	--Get the station they last visited within 24 hours
	SELECT TOP 1 @StationID = checkin.StationID 
	FROM dbo.StationCheckinTbl checkin
	WHERE
		--Car visited station
		checkin.LicensePlate	= @LicensePlate AND
		--Been less than a day
		DATEDIFF(hour, checkin.[Timestamp], @CurrTime) < 24
	ORDER BY checkin.[Timestamp] DESC

	--If null, they didn't visit a station in the last 24 hours
	IF @StationID IS NOT NULL
	BEGIN
		--Check if they already did not already do a survey for this station within the last 24 hours
		IF NOT EXISTS(	SELECT TOP 1 HecoRewardsSurveyID
					FROM dbo.HecoRewardsSurveyTbl
					WHERE
						StationID = @StationID AND
						LicensePlate = @LicensePlate AND
						--Been less than a day
						DATEDIFF(hour, [Timestamp], @CurrTime) < 24)
		BEGIN
			--At this point, we have verified that for the last station this driver has been to (within the last 24 hours),
			--they did not do a survey. So now we can insert!
			INSERT INTO dbo.HecoRewardsSurveyTbl (
				StationID,
				LicensePlate,
				DidTheCarCharge,
				CardDeclined,
				CardReaderBroken,
				IsTesla,
				PortType,
				AdditionalComments
			)
			VALUES (@StationID, @LicensePlate, @DidTheCarCharge, @CardDeclined, @CardReaderBroken, @IsTesla, @PortType, @AdditionalComments)

			UPDATE dbo.HecoRewardsTbl
			SET Points = Points + 10
			FROM dbo.HecoRewardsTbl
			WHERE
				LicensePlate = @LicensePlate

			SELECT 'true' as [Status], 'You earned 10 points!' as [Message]
		END
		ELSE
		BEGIN
			SELECT 'false' [Status], 'You already did a survey for your most recent station visit' as [Message]
		END			
	END 
	ELSE
	BEGIN
		SELECT 'false' as [Status], 'Your car hasn''t visited a charging station within the last 24 hours' as [Message]
	END

END
GO
/****** Object:  StoredProcedure [dbo].[HecoStation_CheckinCar_Proc]    Script Date: 11/14/2019 8:42:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Joshua Nishiguchi
-- Create Date: 11/5/2019
-- Description: Checks in licenseplate of car to a station
-- =============================================
CREATE PROCEDURE [dbo].[HecoStation_CheckinCar_Proc]
@LicensePlate varchar(8),
@StationName varchar(50)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    DECLARE @StationID bigint

	SELECT @StationID = StationID
	FROM StationMasterTbl
	WHERE
		StationName = @StationName

	INSERT INTO dbo.StationCheckinTbl (
		StationID,
		LicensePlate
	)
	VALUES(@StationID, @LicensePlate)
	IF @@ERROR <> 0
	BEGIN
		SELECT 'false' as [Status]
		return
	END

	SELECT 'true' as [Status]
END
GO
/****** Object:  StoredProcedure [dbo].[HecoStation_Data_Proc]    Script Date: 11/14/2019 8:42:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Joshua Nishiguchi
-- Create Date: 11/7/2019
-- Description: Return data csv from table
-- =============================================
CREATE PROCEDURE [dbo].[HecoStation_Data_Proc]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

	SELECT 
	  m.[StationID]
	  ,d.[StationName]
      ,d.[SessionInitiated]
      ,d.[StartTime]
      ,d.[EndTime]
      ,d.[Duration]
      ,d.[Energy]
      ,d.[SessionAmount]
      ,d.[SessionID]
      ,d.[PortType]
      ,d.[PaymentMode]
  FROM [dbo].[StationDataTbl] d
  INNER JOIN [dbo].[StationMasterTbl] m
  ON
	d.StationName = m.StationName

END
GO
/****** Object:  StoredProcedure [dbo].[HecoStation_DataInsert_Proc]    Script Date: 11/14/2019 8:42:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Joshua Nishiguchi
-- Create Date: 11/7/2019
-- Description: Insert station data individual context
-- =============================================
CREATE PROCEDURE [dbo].[HecoStation_DataInsert_Proc]
@StationName varchar(50),
@SessionInitiated varchar(50),
@StartTime datetime,
@EndTime datetime,
@Duration varchar(50),
@Energy decimal(18,2),
@SessionAmount varchar(50),
@SessionID bigint,
@PortType varchar(50),
@PaymentMode varchar(50)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

	INSERT INTO dbo.StationDataTbl (
		StationName,
		SessionInitiated,
		StartTime,
		EndTime,
		Duration,
		Energy,
		SessionAmount,
		SessionID,
		PortType,
		PaymentMode
	)
	VALUES (@StationName, @SessionInitiated, @StartTime, @EndTime, @Duration, @Energy, @SessionAmount, @SessionID, @PortType, @PaymentMode)

END
GO
/****** Object:  StoredProcedure [dbo].[HecoStation_GetForecastedData_Proc]    Script Date: 11/14/2019 8:42:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Joshua Nishiguchi
-- Create Date: 11/12/2019
-- Description: Get forecasted data
-- =============================================
CREATE PROCEDURE [dbo].[HecoStation_GetForecastedData_Proc]
@StationID int --If -1, return all
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    IF @StationID = -1
	BEGIN
		SELECT [Timestamp]
		  ,SUM([Energy]) as Energy
		  ,SUM([ErrorRounding]) as ErrorRounding
		  ,SUM([ErrorCalculation]) as ErrorCalculation
		  ,SUM([OnPeak]) as OnPeak
		  ,SUM([MidDay]) as MidDay
		  ,SUM([OffPeak]) as OffPeak
		  ,SUM([PortType_CHADEMO]) as PortType_CHADEMO
		  ,SUM([PortType_DCCOMBOTYP1]) as PortType_DCCOMBOTYP1
		  ,SUM([PaymentMode_CreditCard]) as PaymentMode_CreditCard
		  ,SUM([PaymentMode_RFID]) as PaymentMode_RFID
		  ,SUM([SessionTypeDevice]) as SessionTypeDevice
		  ,SUM([SessionTypeMobile]) as SessionTypeMobile
		  ,SUM([SessionTypeWeb]) as SessionTypeWeb
	  FROM [dbo].[ForecastOutputEnergyTbl]
	  GROUP BY [Timestamp]
	END
	ELSE
	BEGIN
		/****** Script for SelectTopNRows command from SSMS  ******/
		SELECT f.[StationName]
			,[Timestamp]
			,[Energy]
			,[ErrorRounding]
			,[ErrorCalculation]
			,[OnPeak]
			,[MidDay]
			,[OffPeak]
			,[PortType_CHADEMO]
			,[PortType_DCCOMBOTYP1]
			,[PaymentMode_CreditCard]
			,[PaymentMode_RFID]
			,[SessionTypeDevice]
			,[SessionTypeMobile]
			,[SessionTypeWeb]
		FROM [dbo].[ForecastOutputEnergyTbl] f
		INNER JOIN dbo.StationMasterTbl s
		ON
			f.StationName = s.StationName
		WHERE
			s.StationID = @StationID
		
	END
END
GO
/****** Object:  StoredProcedure [dbo].[HecoStation_GetHistoricalData_Proc]    Script Date: 11/14/2019 8:42:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Joshua Nishiguchi
-- Create Date: 11/12/2019
-- Description: Returns station historical data calculated from all_historical.py
-- =============================================
CREATE PROCEDURE [dbo].[HecoStation_GetHistoricalData_Proc]
@StationID int --If -1, don't filter
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

	IF @StationID = -1
	BEGIN
		SELECT 
		  [Timestamp]
		  ,SUM([Energy]) as Energy
		  ,SUM([Amount]) as Amount
		  ,SUM([OnPeak]) as OnPeak
		  ,SUM([MidDay]) as MidDay
		  ,SUM([OffPeak]) as OffPeak
		  ,SUM([CorrectAmount]) as CorrectAmount
		  ,SUM([ErrorRounding]) as ErrorRounding
		  ,SUM([ErrorCalculation]) as ErrorCalculation
		  ,SUM([SessionTypeDevice]) as SessionTypeDevice
		  ,SUM([SessionTypeMobile]) as SessionTypeMobile
		  ,SUM([SessionTypeWeb]) as SessionTypeWeb
		  ,SUM([PortType_CHADEMO]) as PortType_CHADEMO
		  ,SUM([PortType_DCCOMBOTYP1]) as PortType_DCCOMBOTYP1
		  ,SUM([PaymentMode_CreditCard]) as PaymentMode_CreditCard
		  ,SUM([PaymentMode_RFID]) as PaymentMode_RFID
		  ,SUM([CorrectDuration] ) as CorrectDuration
		FROM HecoDB.dbo.[StationDataHistoricalTbl]
		GROUP BY [Timestamp]
	END
	ELSE
	BEGIN
		SELECT s.[StationName]
		  ,[Timestamp]
		  ,[Energy]
		  ,[Amount]
		  ,[OnPeak]
		  ,[MidDay]
		  ,[OffPeak]
		  ,[CorrectAmount]
		  ,[ErrorRounding]
		  ,[ErrorCalculation]
		  ,[SessionTypeDevice]
		  ,[SessionTypeMobile]
		  ,[SessionTypeWeb]
		  ,[PortType_CHADEMO]
		  ,[PortType_DCCOMBOTYP1]
		  ,[PaymentMode_CreditCard]
		  ,[PaymentMode_RFID]
		  ,[CorrectDuration] FROM HecoDB.dbo.[StationDataHistoricalTbl] hist
		INNER JOIN dbo.StationMasterTbl s
		ON
			hist.StationName = s.StationName
		WHERE
			s.StationID = @StationID
	END
END
GO
/****** Object:  StoredProcedure [dbo].[HecoStation_GetStationCheckin_Proc]    Script Date: 11/14/2019 8:42:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Joshua Nishiguchi
-- Create Date: 11/11/2019
-- Description: Returns station checkin data from the last day, week, month, or year
-- =============================================
CREATE PROCEDURE [dbo].[HecoStation_GetStationCheckin_Proc]
@Periodicity int, --0=day, 1=week, 2=month, 3=year
@StationID int --potentially could be -1 which means every StationID
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

	--If -1, query "all"
	IF @StationID = -1
	BEGIN
		--One day
		IF @Periodicity = 0
		BEGIN
			SELECT *
			FROM StationCheckinTbl c
			INNER JOIN StationMasterTbl s
			ON
				c.StationID = s.StationID
			WHERE
				c.[TimeStamp] BETWEEN DATEADD(DAY,-1,GETDATE()) AND GETDATE()
		END
		ELSE
		BEGIN
			IF @Periodicity = 1
			BEGIN
				SELECT *
				FROM StationCheckinTbl c
				INNER JOIN StationMasterTbl s
				ON
					c.StationID = s.StationID
				WHERE
					c.[TimeStamp] BETWEEN DATEADD(WEEK,-1,GETDATE()) AND GETDATE()
			END
			ELSE
			BEGIN
				IF @Periodicity = 2
				BEGIN
					SELECT *
					FROM StationCheckinTbl c
					INNER JOIN StationMasterTbl s
					ON
						c.StationID = s.StationID
					WHERE
						c.[TimeStamp] BETWEEN DATEADD(MONTH,-1,GETDATE()) AND GETDATE()
				END
				ELSE
				BEGIN
					IF @Periodicity = 3
					BEGIN
						SELECT *
						FROM StationCheckinTbl c
						INNER JOIN StationMasterTbl s
						ON
							c.StationID = s.StationID
						WHERE
							c.[TimeStamp] BETWEEN DATEADD(YEAR,-1,GETDATE()) AND GETDATE()
					END
					ELSE
					BEGIN
						SELECT 'false' as [Status]
					END
				END
			END
		END
	END
	ELSE
	BEGIN
		--One day
		IF @Periodicity = 0
		BEGIN
			SELECT *
			FROM StationCheckinTbl c
			INNER JOIN StationMasterTbl s
			ON
				c.StationID = s.StationID
			WHERE
				c.[TimeStamp] BETWEEN DATEADD(DAY,-1,GETDATE()) AND GETDATE() AND
				s.StationID = @StationID
		END
		ELSE
		BEGIN
			IF @Periodicity = 1
			BEGIN
				SELECT *
				FROM StationCheckinTbl c
				INNER JOIN StationMasterTbl s
				ON
					c.StationID = s.StationID
				WHERE
					c.[TimeStamp] BETWEEN DATEADD(WEEK,-1,GETDATE()) AND GETDATE() AND
					s.StationID = @StationID
			END
			ELSE
			BEGIN
				IF @Periodicity = 2
				BEGIN
					SELECT *
					FROM StationCheckinTbl c
					INNER JOIN StationMasterTbl s
					ON
						c.StationID = s.StationID
					WHERE
						c.[TimeStamp] BETWEEN DATEADD(MONTH,-1,GETDATE()) AND GETDATE() AND
						s.StationID = @StationID
				END
				ELSE
				BEGIN
					IF @Periodicity = 3
					BEGIN
						SELECT *
						FROM StationCheckinTbl c
						INNER JOIN StationMasterTbl s
						ON
							c.StationID = s.StationID
						WHERE
							c.[TimeStamp] BETWEEN DATEADD(YEAR,-1,GETDATE()) AND GETDATE() AND
							s.StationID = @StationID
					END
					ELSE
					BEGIN
						SELECT 'false' as [Status]
					END
				END
			END
		END
	END
END
GO
/****** Object:  StoredProcedure [dbo].[HecoStation_GetStationHealth_Proc]    Script Date: 11/14/2019 8:42:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Joshua Nishiguchi
-- Create Date: 11/9/2019
-- Description: Returns reported data from 5 days ago (most recent first)
-- =============================================
CREATE PROCEDURE [dbo].[HecoStation_GetStationHealth_Proc]
@StationID bigint
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

	SELECT DidTheCarCharge, CardDeclined, CardReaderBroken, IsTesla, PortType, AdditionalComments, [Timestamp]
	FROM dbo.HecoRewardsSurveyTbl
	WHERE
		StationID = @StationID AND
		[TimeStamp] BETWEEN DATEADD(DAY,-5,GETDATE()) AND GETDATE()
	ORDER BY [TimeStamp] DESC

END
GO
/****** Object:  StoredProcedure [dbo].[HecoStation_GetStationHealthStats_Proc]    Script Date: 11/14/2019 8:42:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Joshua Nishiguchi
-- Create Date: 11/9/2019
-- Description: Returns the number of stations that are healthy, and the number that aren't healthy
-- =============================================
CREATE PROCEDURE [dbo].[HecoStation_GetStationHealthStats_Proc]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

	DECLARE @NumBroke int
	DECLARE @NumWork int

    -- Insert statements for procedure here
	SELECT @NumBroke = COUNT(DISTINCT StationID)
	FROM dbo.HecoRewardsSurveyTbl
	WHERE
		CardReaderBroken = 1 OR (DidTheCarCharge = 0 AND CardDeclined = 0)

	SELECT @NumWork = COUNT(DISTINCT StationID)
	FROM dbo.HecoRewardsSurveyTbl
	WHERE
		CardReaderBroken = 0 OR DidTheCarCharge = 1 AND CardDeclined = 0

	SELECT @NumBroke as BrokenStations, @NumWork as WorkingStations
END
GO
USE [master]
GO
ALTER DATABASE [HecoDB] SET  READ_WRITE 
GO
