WITH maxRevision AS (
	SELECT
		MAX(revision) AS v
	FROM
		clones
),
clonesInLastRevision AS (
	SELECT
		clones.*
	FROM
		clones,
		maxRevision
	WHERE
		revision = maxRevision.v
)
SELECT
	*,
	(endLine - startLine) AS size,
	-- filePath as directoryPath,
	(
		SELECT
			SUM(additionCount)
		FROM
			clones
		WHERE
			clones.globalId = clonesInLastRevision.globalId
	) AS totalAdditionCount,
	(
		SELECT
			SUM(deletionCount)
		FROM
			clones
		WHERE
			clones.globalId = clonesInLastRevision.globalId
	) AS totalDeletionCount,
	(
		SELECT
			COUNT(revision)
		FROM
			clones
		WHERE
			clones.globalId = clonesInLastRevision.globalId
			AND (
				clones.additionCount > 0
				OR clones.deletionCount > 0
			)
	) AS frequency,
	(
		SELECT
			MIN(revision)
		FROM
			clones
		WHERE
			clones.globalId = clonesInLastRevision.globalId
	) AS startingRevision
FROM
	clonesInLastRevision;